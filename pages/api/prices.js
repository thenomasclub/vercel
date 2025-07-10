// /pages/api/prices.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    limit: 100,
  });

  // Optional: filter to only prices for your subscription product
  const filtered = prices.data.filter(price =>
    price.product.metadata?.builder_visible === 'true'
  );

  res.status(200).json(filtered);
}
