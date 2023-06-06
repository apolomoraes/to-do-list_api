const { Router } = require('express');
const AuthController = require('../app/controllers/AuthController');

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post('/register', authController.register);
authRoutes.post('/auth', authController.authenticate);
authRoutes.post('/recover', authController.recoverPassword);
authRoutes.post('/reset_password', authController.resetPassword);

module.exports = authRoutes;