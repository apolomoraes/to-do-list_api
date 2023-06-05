const { Router } = require('express');
const authRoutes = require('../routes/auth.routes');
const projectRoutes = require('../routes/project.routes');

const routes = Router();

routes.use('/register', authRoutes);
routes.use('/project', projectRoutes);

module.exports = routes;