const { createReview, getProductReviews, deleteReview } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/auth');

module.exports = async (req, res) => {
  const { method, query, body } = req;

  if (method === 'POST') {
    return verifyToken(req, res, () => createReview(req, res));
  } else if (method === 'GET') {
    return getProductReviews(req, res);
  } else if (method === 'DELETE') {
    return verifyToken(req, res, () => deleteReview(req, res));
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};