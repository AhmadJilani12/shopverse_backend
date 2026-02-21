const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadImages } = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/auth');

module.exports = async (req, res) => {
  const { method, query, body } = req;

  if (method === 'GET') {
    if (query.id) {
      return getProduct(req, res);
    } else {
      return getProducts(req, res);
    }
  } else if (method === 'POST') {
    return verifyToken(req, res, () => isAdmin(req, res, () => uploadImages(req, res, () => createProduct(req, res))));
  } else if (method === 'PUT') {
    return verifyToken(req, res, () => isAdmin(req, res, () => uploadImages(req, res, () => updateProduct(req, res))));
  } else if (method === 'DELETE') {
    return verifyToken(req, res, () => isAdmin(req, res, () => deleteProduct(req, res)));
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};