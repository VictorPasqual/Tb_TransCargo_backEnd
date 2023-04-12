const { Router } = require('express');
const authController = require('../controllers/AuthController');

const router = Router()

router.post('/auth', authController.authenticate);

// // Rota de admin restrita
// router.get('/admin', authController.validateUserRole('admin'), (req, res) => {
//     res.send('Admin Page');
// });

// // Rota de motorista restrita
// router.get('/motorista', authController.validateUserRole('motorista'), (req, res) => {
//     res.send('Motorista Page');
// });

// // Rota de cliente restrita
// router.get('/cliente', authController.validateUserRole('cliente'), (req, res) => {
//     res.send('Cliente Page');
// });


module.exports = router;

