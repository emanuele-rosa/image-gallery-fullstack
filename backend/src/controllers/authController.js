// src/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar usuário
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // Verificar senha
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    // Gerar token
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { login };
