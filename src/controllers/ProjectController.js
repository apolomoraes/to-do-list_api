class ProjectController {
  create(req, res) {
    return res.json({ message: 'Project created', user: req.userId });
  }
}

module.exports = ProjectController;