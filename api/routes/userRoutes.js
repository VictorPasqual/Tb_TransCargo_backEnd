const { Router } = require('express')
const UserController = require('../controllers/UserController')
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const router = Router()

router
  .get('/users', UserController.readAllUsers)
  .get('/users/:id', UserController.readOneUser)
  .post('/users', UserController.postUser)
  .post('/change-password', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    console.log('Email:', email);
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    try {
      // Obtenha o usuário do banco de dados
      const user = await Users.findOne({ where: { email } });
      console.log('User:', user);
      console.log('User Password:', user.password);
      // Verifique se o usuário existe
      if (!user) {
        console.log('Usuário não encontrado');
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Verifique se a senha atual fornecida corresponde à senha do usuário
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );

      console.log(isPasswordCorrect)

      if (!isPasswordCorrect) {
        console.log('Senha atual incorreta');
        return res.status(400).json({ error: 'Senha atual incorreta' });
      }
      console.log('Senha atual correta');
      
      // Atualize a senha do usuário no banco de dados
      await Users.update(
        { password: newPassword },
        { where: { email } }
      );

      console.log('Senha alterada com sucesso');
      res.status(200).json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao alterar a senha' });
    }
  })
  .put('/users/:id', UserController.updateUser)
  .delete('/users/:id', UserController.deleteUser);

module.exports = router;
