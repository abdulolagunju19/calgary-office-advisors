import fs from 'fs';
import path from 'path';

const BLOG_PATH = path.join(process.cwd(), 'data', 'blog-posts.json');

function readPosts() {
  if (!fs.existsSync(BLOG_PATH)) return [];
  const data = fs.readFileSync(BLOG_PATH, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writePosts(posts) {
  fs.writeFileSync(BLOG_PATH, JSON.stringify(posts, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const posts = readPosts();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const posts = readPosts();
    const post = req.body;
    post.id = post.id || Date.now().toString();
    post.createdAt = post.createdAt || new Date().toISOString();
    post.updatedAt = new Date().toISOString();
    const idx = posts.findIndex(p => p.id === post.id);
    if (idx > -1) {
      posts[idx] = post;
    } else {
      posts.unshift(post);
    }
    writePosts(posts);
    res.status(200).json(post);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    let posts = readPosts();
    posts = posts.filter(p => p.id !== id);
    writePosts(posts);
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
