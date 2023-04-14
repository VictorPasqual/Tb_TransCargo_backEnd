const { Users } = require('../models');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require('../config/configJwt');

module.exports = {
    async authenticate(req, res) {
        const { email, password } = req.body;
        console.log(email, password)
        try {
            // Verifique se o usuário existe e se a senha está correta
            const user = await Users.findOne({ where: { email } });
            console.log(user)

            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            // Verifique se a senha fornecida corresponde à senha armazenada

            const passwordMatch = password === user.password

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // Se chegamos aqui, o usuário está autenticado
            const token = jwt.sign({ id: user.id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRATION_TIME,
            });

            res.json({ token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    },

};