const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  getImages,
  createImage,
  getImageById,
} = require("../controllers/imageController");

router.use(protect); // Protege todas as rotas de imagens

router.route("/").get(getImages).post(createImage);

router.get("/:id", getImageById);

module.exports = router;
