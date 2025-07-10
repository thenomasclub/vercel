// pages/api/prices.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
      limit: 10,
    });

    res.status(200).json(prices.data);
  } catch (error) {
    console.error('Error fetching prices from Stripe:', error);
    res.status(500).json({ error: 'Error fetching prices from Stripe' });
  }
}
