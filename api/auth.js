const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validate');

module.exports = async (req, res) => {
  const { method, query, body } = req;

  if (method === 'POST') {
    if (query.action === 'register') {
      return validateRegister(req, res, () => register(req, res));
    } else if (query.action === 'login') {
      return validateLogin(req, res, () => login(req, res));
    }
  } else if (method === 'GET') {
    return verifyToken(req, res, () => getMe(req, res));
  } else if (method === 'PUT') {
    return verifyToken(req, res, () => updateProfile(req, res));
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};