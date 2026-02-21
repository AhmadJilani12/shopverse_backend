const { createStripeIntent, confirmStripePayment, processCod } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');

module.exports = async (req, res) => {
  const { method, query, body } = req;

  if (method === 'POST') {
    if (query.type === 'stripe') {
      return verifyToken(req, res, () => createStripeIntent(req, res));
    } else if (query.type === 'confirm') {
      return verifyToken(req, res, () => confirmStripePayment(req, res));
    } else if (query.type === 'cod') {
      return verifyToken(req, res, () => processCod(req, res));
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};