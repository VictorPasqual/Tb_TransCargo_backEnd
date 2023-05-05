const { Router } = require('express');
const authController = require('../controllers/AuthController');

const router = Router()

router.get ('/infoUser', authController.getUserData);
router.post('/auth', authController.authenticate);

module.exports = router;

