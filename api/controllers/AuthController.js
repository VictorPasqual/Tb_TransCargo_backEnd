// controllers/authController.js
const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require('../config/configJwt');

module.exports = {
    async authenticate(req, res) {
        const { email, password } = req.body;
        try {
            // Verifique se o usuário existe e se a senha está correta
            const user = await Users.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            // Se o usuário existir e a senha estiver correta, retorne um token JWT para o frontend
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
            console.log(token)
            return res.status(200).json({ userId: user.id, token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    },

    async validateUserRole(req, res, next) {
        const userRole = req.user.role;
        if (userRole === 'admin' || userRole === 'motorista' || userRole === 'cliente') {
            next();
        } else {
            res.status(403).json({ message: 'Você não tem permissão para acessar esta rota.' });
        }
    }
};
