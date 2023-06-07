const Project = require('../models/Project');
const Task = require('../models/Task');

class ProjectController {
  async list(req, res) {
    try {
      const projects = await Project.find().populate(['user', 'tasks']);

      return res.json(projects);
    } catch (error) {
      res.status(500).json({
        error: "Erro",
        message: error,
      })
    }
  }

  async show(req, res) {
    try {
      const { projectId } = req.params;

      const project = await Project.findById(projectId).populate(['user', 'tasks']);

      return res.json(project);
    } catch (error) {
      res.status(500).json({
        error: "Erro",
        message: error,
      })
    }
  }

  async create(req, res) {
    try {
      const { title, description, tasks } = req.body;

      const project = await Project.create({
        title,
        description,
        user: req.userId,
      });

      await Promise.all(tasks.map(async task => {
        const projectTasks = new Task({
          ...task,
          project: project._id,
        });

        await projectTasks.save();
        project.tasks.push(projectTasks);
      }));

      await project.save();

      return res.json(project)
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Erro",
        message: error,
      })
    }
  }

  async update(req, res) {
    try {
      const { title, description, tasks } = req.body;

      const project = await Project.findByIdAndUpdate(req.params.projectId, {
        title,
        description,
      }, { new: true });

      project.tasks = [];
      await Task.deleteOne({ project: project._id })

      await Promise.all(tasks.map(async task => {
        const projectTasks = new Task({
          ...task,
          project: project._id,
        });

        await projectTasks.save();
        project.tasks.push(projectTasks);
      }));

      await project.save();

      return res.json(project)
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Erro",
        message: error,
      })
    }
  }

  async delete(req, res) {
    try {
      const { projectId } = req.params;

      await Project.findByIdAndRemove(projectId);

      return res.json();
    } catch (error) {
      res.status(500).json({
        error: "Erro",
        message: error,
      })
    }
  }
}

module.exports = ProjectController;