const { createOrder, getMyOrders, getOrder, updateOrderStatus } = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validate');

module.exports = async (req, res) => {
  const { method, query, body } = req;

  if (method === 'POST') {
    return verifyToken(req, res, () => validateOrder(req, res, () => createOrder(req, res)));
  } else if (method === 'GET') {
    if (query.me) {
      return verifyToken(req, res, () => getMyOrders(req, res));
    } else {
      return verifyToken(req, res, () => getOrder(req, res));
    }
  } else if (method === 'PUT') {
    return verifyToken(req, res, () => isAdmin(req, res, () => updateOrderStatus(req, res)));
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};