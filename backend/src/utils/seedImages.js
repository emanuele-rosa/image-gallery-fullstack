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
];

const seedImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Encontrar o primeiro usuário para associar às imagens
    const user = await User.findOne();

    if (!user) {
      console.error(
        "Nenhum usuário encontrado. Execute o seedUsers.js primeiro."
      );
      process.exit(1);
    }

    // Limpar imagens existentes
    await Image.deleteMany({});

    // Adicionar userId às imagens
    const imagesWithUser = sampleImages.map((image) => ({
      ...image,
      createdBy: user._id,
    }));

    // Criar as imagens
    await Image.create(imagesWithUser);

    console.log("Imagens de exemplo criadas com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao criar imagens:", error);
    process.exit(1);
  }
};

seedImages();
