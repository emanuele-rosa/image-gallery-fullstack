const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const { cacheMiddleware } = require("../config/cache");
const { getImages, createImage } = require("../controllers/imageController");

router.use(protect); // Protege todas as rotas de imagens

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Lista todas as imagens
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista de imagens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       author:
 *                         type: string
 *                       width:
 *                         type: number
 *                       height:
 *                         type: number
 *                       url:
 *                         type: string
 *                       download_url:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       createdBy:
 *                         type: string
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token não fornecido ou inválido
 */
router.get("/", protect, cacheMiddleware(300), getImages);

/* *   post:
 *     summary: Cria uma nova imagem
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - width
 *               - height
 *               - url
 *               - download_url
 *             properties:
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *               width:
 *                 type: number
 *                 example: 1920
 *               height:
 *                 type: number
 *                 example: 1080
 *               url:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               download_url:
 *                 type: string
 *                 example: "https://example.com/download/image.jpg"
 *     responses:
 *       201:
 *         description: Imagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 author:
 *                   type: string
 *                 width:
 *                   type: number
 *                 height:
 *                   type: number
 *                 url:
 *                   type: string
 *                 download_url:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 createdBy:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todos os campos são obrigatórios"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token não fornecido ou inválido
 */
router.post("/", protect, createImage);

module.exports = router;
