const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/auth');

module.exports = async (req, res) => {
  const { method, query, body } = req;

  if (method === 'GET') {
    if (query.id) {
      return getCategory(req, res);
    } else {
      return getCategories(req, res);
    }
  } else if (method === 'POST') {
    return verifyToken(req, res, () => isAdmin(req, res, () => createCategory(req, res)));
  } else if (method === 'PUT') {
    return verifyToken(req, res, () => isAdmin(req, res, () => updateCategory(req, res)));
  } else if (method === 'DELETE') {
    return verifyToken(req, res, () => isAdmin(req, res, () => deleteCategory(req, res)));
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};