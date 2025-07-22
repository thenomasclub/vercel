export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const listId = process.env.KLAVIYO_LEGACY_LIST_ID; // e.g. 'XXxxxx' from Klaviyo list
    const formData = new URLSearchParams();
    formData.append('g', listId);
    formData.append('email', email);

    const response = await fetch('https://manage.kmail-lists.com/ajax/subscriptions/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true, subscribed: data.data.is_subscribed });
    } else {
      return res.status(400).json({ success: false, error: data.errors });
    }
  } catch (error) {
    console.error('❌ Subscription error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}
