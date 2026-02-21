const { getStats, getUsers, updateUser, deleteUser, getAllOrders } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

module.exports = async (req, res) => {
  const { method, query, body } = req;

  if (method === 'GET') {
    if (query.action === 'stats') {
      return verifyToken(req, res, () => isAdmin(req, res, () => getStats(req, res)));
    } else if (query.action === 'users') {
      return verifyToken(req, res, () => isAdmin(req, res, () => getUsers(req, res)));
    } else if (query.action === 'orders') {
      return verifyToken(req, res, () => isAdmin(req, res, () => getAllOrders(req, res)));
    }
  } else if (method === 'PUT') {
    return verifyToken(req, res, () => isAdmin(req, res, () => updateUser(req, res)));
  } else if (method === 'DELETE') {
    return verifyToken(req, res, () => isAdmin(req, res, () => deleteUser(req, res)));
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};