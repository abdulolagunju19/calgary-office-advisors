import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'companies.json');
  if (req.method === 'GET') {
    if (!fs.existsSync(filePath)) return res.status(200).json([]);
    const data = fs.readFileSync(filePath, 'utf-8');
    try {
      res.status(200).json(JSON.parse(data));
    } catch {
      res.status(200).json([]);
    }
  } else if (req.method === 'POST') {
    const { name, address, website, phone, isHiring, hiringLink, firstName, lastName, email } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: 'Business name and address are required' });
    }
    try {
      const companiesData = fs.readFileSync(filePath, 'utf8');
      const companies = JSON.parse(companiesData);
      const id = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') + '-' + Date.now().toString(36);
      const newCompany = {
        id,
        name,
        address,
        website: website || '',
        phone: phone || '',
        category: 'Business',
        description: `Business added by ${firstName || 'User'} ${lastName || ''}`.trim(),
        lat: 51.0447,
        lng: -114.0719,
        isHiring: isHiring || false,
        hiringLink: hiringLink || '',
        contact: {
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
        },
        addedAt: new Date().toISOString(),
      };
      companies.push(newCompany);
      fs.writeFileSync(filePath, JSON.stringify(companies, null, 2));
      return res.status(201).json({ success: true, company: newCompany, message: 'Business added successfully' });
    } catch (error) {
      console.error('Error adding company:', error);
      return res.status(500).json({ error: 'Failed to add business' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
