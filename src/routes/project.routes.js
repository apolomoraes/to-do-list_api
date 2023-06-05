const { Router } = require('express');
const ProjectController = require('../controllers/ProjectController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const projectRoutes = Router();

const projectController = new ProjectController();

projectRoutes.use(ensureAuthenticated);

projectRoutes.get('/', projectController.create);

module.exports = projectRoutes;