const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post('/', authController.register);
authRoutes.post('/auth', authController.authenticate);

module.exports = authRoutes;