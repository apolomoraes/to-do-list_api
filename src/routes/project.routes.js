const { Router } = require('express');
const ProjectController = require('../app/controllers/ProjectController');
const ensureAuthenticated = require('../app/middlewares/ensureAuthenticated');

const projectRoutes = Router();

const projectController = new ProjectController();

projectRoutes.use(ensureAuthenticated);

projectRoutes.get('/', projectController.list);
projectRoutes.get('/:projectId', projectController.show);
projectRoutes.post('/', projectController.create);
projectRoutes.put('/:projectId', projectController.update);
projectRoutes.delete('/:projectId', projectController.delete);

module.exports = projectRoutes;