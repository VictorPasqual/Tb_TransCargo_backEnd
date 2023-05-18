const { Router } = require('express');
const authController = require('../controllers/AuthController');

const router = Router()

router.get ('/infoUser', authController.getUserData);
router.get('/trucks/:owner/user', authController.getTrucksByOwner)
router.get('/trucks/:caminhaoId/cargas', authController.getCargasDoCaminhao)
router.post('/auth', authController.authenticate);
router.post('/authAdmin', authController.authenticateAdmin);

module.exports = router;

