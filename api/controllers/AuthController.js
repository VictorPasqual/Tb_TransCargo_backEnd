const { Users } = require('../models');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require('../config/configJwt');
const database = require('../models')

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
    async authenticateAdmin(req, res) {
        const { email, password } = req.body;
        console.log(email, password);
        try {
            // Verifique se o usuário existe e se a senha está correta
            const user = await Users.findOne({ where: { email } });
            console.log(user);

            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            // Verifique se a senha fornecida corresponde à senha armazenada
            const passwordMatch = password === user.password;

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // Verifique se o usuário tem a role de admin
            if (user.role !== 'admin') {
                return res.status(401).json({ message: 'Apenas administradores podem autenticar.' });
            }


            res.status(200).json({
                message: 'Autenticação Admin bem-sucedida!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
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
    async getTrucksByOwner(req, res) {
        const { owner } = req.params;

        try {
            // Consulta os caminhões no banco de dados com base no proprietário
            const trucks = await database.Caminhoes.findAll({ where: { owner } });
            res.json(trucks);
        } catch (error) {
            console.error("Erro ao obter os caminhões:", error);
            res.status(500).json({ error: "Erro ao obter os caminhões" });
        }
    },
    async getCargasDoCaminhao(req, res) {
        const { caminhaoId } = req.params;
        console.log(caminhaoId)
        try {
            // Verifica se o caminhão pertence ao proprietário (você)
            const caminhao = await database.Caminhoes.findOne({ id: caminhaoId });
            console.log(caminhao)
            if (!caminhao) {
                return res.status(404).json({ error: 'Caminhão não encontrado.' });
            }

            // Busca as cargas atribuídas ao caminhão
            const cargas = await database.Cargas.findOne({ caminhaoId: caminhaoId });
            console.log(cargas)
            res.status(200).json(cargas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar as cargas do caminhão.' });
        }
    }

};
