const { Router } = require('express');
const authController = require('../controllers/AuthController');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/configJwt');

const router = Router()

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Rota protegida
router.get('/protected-route', verifyToken, (req, res) => {
    // A role do usuário está armazenada em req.user.role
    res.json({ message: `Welcome ${req.user.role}!` });
});

router.post('/auth', authController.authenticate);

module.exports = router;

