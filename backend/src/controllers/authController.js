const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { tokenBlacklist } = require("../middlewares/security");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    await new Promise((resolve) => setTimeout(resolve, Math.random() * 200));

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    if (user.activeTokens && user.activeTokens.length > 0) {
      for (const token of user.activeTokens) {
        await tokenBlacklist.add(token, jwt.decode(token).exp);
      }
    }

    const token = generateToken(user._id);

    user.activeTokens = [token];
    await user.save();

    const sessionId = require("crypto").randomBytes(32).toString("hex");
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.json({
      _id: user._id,
      username: user.username,
      token,
      sessionId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { login };
