/* NOT NEEDED
export default async function handler(req, res) {
  try {
    const ipRes = await fetch('https://ipapi.co/json/');
    const data = await ipRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'IP lookup failed' });
  }
}
*/