const { Router } = require('express');
const authRoutes = require('../routes/auth.routes');

const routes = Router();

routes.use('/register', authRoutes);

module.exports = routes;