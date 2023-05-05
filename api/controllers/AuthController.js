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

            res.status(200).json({
                message: 'Autenticação bem-sucedida!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token: token
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    },
    async getUserData(req, res) {
        console.log('TESTE')
        console.log(req.headers.authorization)
        console.log(req.headers)

        const token = req.headers.authorization
        console.log(token)
        try {
            // Decodifica o token e extrai as informações do usuário
            const decodedToken = jwt.verify(token, JWT_SECRET);

            console.log(decodedToken)
            console.log(token)
            const userId = decodedToken.id;

            const userData = await Users.findByPk(userId);

            res.status(200).json({
                user: {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                },
            });
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Token inválido.' });
        }
    },
};
