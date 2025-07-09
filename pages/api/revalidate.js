// pages/api/revalidate.js
export default async function handler(req, res) {
  const secret = req.query.secret;

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid revalidation token' });
  }

  const path = req.query.path || '/';

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true, path });
  } catch (err) {
    console.error('Revalidation error:', err);
    return res.status(500).json({ error: 'Revalidation failed', details: err });
  }
}
