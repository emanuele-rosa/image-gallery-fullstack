require("dotenv").config();
const mongoose = require("mongoose");
const Image = require("../models/Image");
const User = require("../models/User");

const sampleImages = [
  {
    author: "John Doe",
    width: 1200,
    height: 800,
    url: "https://picsum.photos/id/1/1200/800",
    download_url: "https://picsum.photos/id/1/1200/800",
  },
  {
    author: "Jane Smith",
    width: 1600,
    height: 900,
    url: "https://picsum.photos/id/2/1600/900",
    download_url: "https://picsum.photos/id/2/1600/900",
  },
  {
    author: "Mike Johnson",
    width: 2000,
    height: 1500,
    url: "https://picsum.photos/id/3/2000/1500",
    download_url: "https://picsum.photos/id/3/2000/1500",
  },
  {
    author: "Emily Davis",
    width: 1920,
    height: 1080,
    url: "https://picsum.photos/id/4/1920/1080",
    download_url: "https://picsum.photos/id/4/1920/1080",
  },
  {
    author: "Robert Brown",
    width: 1024,
    height: 768,
    url: "https://picsum.photos/id/5/1024/768",
    download_url: "https://picsum.photos/id/5/1024/768",
  },
  {
    author: "Sophia Wilson",
    width: 1280,
    height: 720,
    url: "https://picsum.photos/id/6/1280/720",
    download_url: "https://picsum.photos/id/6/1280/720",
  },
  {
    author: "Liam Martinez",
    width: 2560,
    height: 1440,
    url: "https://picsum.photos/id/7/2560/1440",
    download_url: "https://picsum.photos/id/7/2560/1440",
  },
  {
    author: "Olivia Taylor",
    width: 1366,
    height: 768,
    url: "https://picsum.photos/id/8/1366/768",
    download_url: "https://picsum.photos/id/8/1366/768",
  },
];

const seedImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne();

    if (!user) {
      console.error(
        "Nenhum usuário encontrado. Execute o seedUsers.js primeiro."
      );
      process.exit(1);
    }

    await Image.deleteMany({});

    const imagesWithUser = sampleImages.map((image) => ({
      ...image,
      createdBy: user._id,
    }));

    await Image.create(imagesWithUser);

    console.log("Imagens de exemplo criadas com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao criar imagens:", error);
    process.exit(1);
  }
};

seedImages();
