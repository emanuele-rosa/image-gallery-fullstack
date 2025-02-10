const Image = require("../models/Image");
const { redisClient } = require("../config/cache");

const getImages = async (req, res) => {
  try {
    const { author, page = 1, limit = 10 } = req.query;
    const query = author ? { author: new RegExp(author, "i") } : {};

    const images = await Image.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Image.countDocuments(query);

    res.json({
      images,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar imagens" });
  }
};

const createImage = async (req, res) => {
  try {
    const { author, width, height, url, download_url } = req.body;

    const image = new Image({
      author,
      width,
      height,
      url,
      download_url,
      createdBy: req.user._id,
    });

    const savedImage = await image.save();

    const cachePattern = "cache:/api/images*";
    const keys = await redisClient.keys(cachePattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    res.status(201).json(savedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar imagem" });
  }
};

module.exports = { getImages, createImage };
