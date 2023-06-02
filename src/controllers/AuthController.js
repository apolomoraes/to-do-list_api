const User = require('../database/models/User');
const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          error: "Ops",
          message: "Preencha todos os campos",
        });
      };

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({
          error: "Erro",
          message: "Este e-mail já está em uso",
        });
      };

      const user = await User.create({
        name,
        email,
        password,
      });

      user.password = undefined;

      return res.json(user);

    } catch (error) {
      return res.status(500).json({
        error: "Registration failed",
        message: error,
      });
    }
  }

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({
        error: "Erro",
        message: "Usuário não encontrado",
      });
    }

    if (!await compare(password, user.password) || email !== user.email) {
      return res.status(400).json({
        error: "Erro",
        message: "Email ou senha inválido(a)",
      });
    }

    user.password = undefined;

    const token = jwt.sign({
      id: user.id,
    })

    return res.json(user);
  }
}

module.exports = AuthController;