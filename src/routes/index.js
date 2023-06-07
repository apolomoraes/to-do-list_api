const { Router } = require('express');
const authRoutes = require('../routes/auth.routes');
const projectRoutes = require('../routes/project.routes');

const routes = Router();

routes.use('/users', authRoutes);
routes.use('/projects', projectRoutes);

module.exports = routes;