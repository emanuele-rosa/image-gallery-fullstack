const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const {
  bruteForceProtection,
  loginLimiter,
} = require("../middlewares/security");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *                 description: Nome de usuário cadastrado
 *               password:
 *                 type: string
 *                 example: "123456"
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token para autenticação
 *                 username:
 *                   type: string
 *                   description: Nome do usuário logado
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário ou senha inválidos"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username e password são obrigatórios"
 */
router.post("/login", bruteForceProtection, loginLimiter, login);

module.exports = router;
