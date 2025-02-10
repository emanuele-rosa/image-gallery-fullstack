require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const users = [
  {
    username: "admin",
    password: "admin123",
  },
  {
    username: "user",
    password: "user123",
  },
  {
    username: "john_doe",
    password: "johndoe123",
  },
  {
    username: "jane_doe",
    password: "janedoe123",
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany({});
    await User.create(users);
    console.log("Usuários criados com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao criar usuários:", error);
    process.exit(1);
  }
};

seedUsers();
