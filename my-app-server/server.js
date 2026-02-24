const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Lazy Stripe init so missing env vars don't crash the process at load time
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return require('stripe')(key);
}

app.post('/api/payment/create-checkout-session', (req, res) => {
  const successUrl = process.env.SUCCESS_URL || `${req.headers.origin || ''}/payment/success`;
  const cancelUrl = process.env.CANCEL_URL || `${req.headers.origin || ''}/payment/cancel`;

  const items = req.body?.items;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items array is required' });
  }

  (async () => {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: item.description || '',
              images: item.images || [],
            },
            unit_amount: Math.round(Number(item.price) * 100),
          },
          quantity: Number(item.quantity) || 1,
        })),
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      res.json({ url: session.url });
    } catch (error) {
      console.error('Stripe error:', error.message);
      res.status(500).json({ error: error.message || 'Payment failed' });
    }
  })();
});

// Health check for Vercel
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Vercel serverless: export the app so it can be invoked per request
module.exports = app;

// Local development: start listening (Vercel does not run this)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const port = process.env.PORT || 4242;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
