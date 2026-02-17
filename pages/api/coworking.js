import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'coworking.json');
  if (req.method === 'GET') {
    if (!fs.existsSync(filePath)) return res.status(200).json([]);
    const data = fs.readFileSync(filePath, 'utf-8');
    try {
      res.status(200).json(JSON.parse(data));
    } catch {
      res.status(200).json([]);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
