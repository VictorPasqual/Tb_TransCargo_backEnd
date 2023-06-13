const { Users, Caminhoes, Rotas, Cargas } = require('../models');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require('../config/configJwt');

module.exports = {
  async authenticate(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const passwordMatch = password === user.password;

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIME,
      });

      res.status(200).json({
        message: 'Autenticação bem-sucedida!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  async authenticateAdmin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const passwordMatch = password === user.password;

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      if (user.role !== 'admin') {
        return res
          .status(401)
          .json({ message: 'Apenas administradores podem autenticar.' });
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
    const token = req.headers.authorization;

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
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

  async validateEmail(req, res) {
    try {
      // Obtenha o email enviado no corpo da requisição
      const { email } = req.body;

      console.log(email);
      // Consulte o banco de dados para verificar se o e-mail existe na tabela de usuários
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Email não encontrado' });
      }

      // Valide se o e-mail é válido
      const isValidEmail = isValidEmailAddress(email);

      if (!isValidEmail) {
        return res.status(401).json({ message: 'Email inválido' });
      }

      // Envie a resposta ao cliente
      res.status(200).json({ message: 'Email válido', isValidEmail });
    } catch (error) {
      console.error('Erro ao validar o e-mail:', error);
      res.status(500).json({ message: 'Erro ao validar o e-mail' });
    }
  },

  async getTrucksByOwner(req, res) {
    const { owner } = req.params;

    try {
      const trucks = await Caminhoes.findAll({ where: { owner } });
      res.json(trucks);
      console.log(trucks);
    } catch (error) {
      console.error('Erro ao obter os caminhões:', error);
      res.status(500).json({ error: 'Erro ao obter os caminhões' });
    }
  },

  async getCargasDoCaminhao(req, res) {
    const { caminhaoId } = req.params;
    console.log(caminhaoId);
    try {
      const caminhao = await Caminhoes.findOne({ where: { id: caminhaoId } });

      if (!caminhao) {
        return res.status(404).json({ error: 'Caminhão não encontrado.' });
      }

      const rota = await Rotas.findAll({ where: { caminhao: caminhaoId } });

      const cargas = await Cargas.findAll({ where: { caminhaoId: caminhaoId } });

      res.status(200).json({ rota, cargas });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as cargas do caminhão.' });
    }
  },
};

function isValidEmailAddress(email) {
  // Implemente a sua lógica de validação de e-mail aqui
  // Retorne true se o e-mail for válido e false caso contrário
  // Você pode utilizar expressões regulares ou outras técnicas para validar o formato do e-mail

  // Exemplo de validação básica utilizando uma expressão regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
