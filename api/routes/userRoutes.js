const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router()

router
  
    .get('/users', UserController.readAllUsers)
    .get('/users/:id', UserController.readOneUser)
    .post('/users', UserController.postUser)
    .post('/change-password', async (req, res) => {
        const { email, currentPassword, newPassword } = req.body;
        console.log(email)
        console.log(currentPassword)
        console.log(newPassword)
        try {
          // Obtenha o usuário do banco de dados
          const user = await Users.findOne({ where: { email } });
          console.log(user)
          console.log(user.password)
          // Verifique se o usuário existe
          if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
          }
    
          // Verifique se a senha atual fornecida corresponde à senha do usuário
          const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            user.password
          );
          if (!!isPasswordCorrect) {
            return res.status(400).json({ error: 'Senha atual incorreta' });
          }
          console.log(isPasswordCorrect)
          // Gere o hash da nova senha
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          console.log(hashedPassword)
          // Atualize a senha do usuário no banco de dados
          await Users.update({ password: hashedPassword }, { where: { email } });
    
          res.status(200).json({ message: 'Senha alterada com sucesso' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao alterar a senha' });
        }
      })
    .put('/users/:id', UserController.updateUser)
    .delete('/users/:id', UserController.deleteUser)

module.exports = router 