const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validate');
const connectDB = require('../config/db');
const createApp = require('../server');

const handler = async (req, res) => {
    await connectDB();
    const app = createApp();

    app.post('/api/auth/register', validateRegister, register);
    app.post('/api/auth/login', validateLogin, login);
    app.get('/api/auth/me', verifyToken, getMe);
    app.put('/api/auth/profile', verifyToken, updateProfile);

    app(req, res);
};

module.exports = handler;