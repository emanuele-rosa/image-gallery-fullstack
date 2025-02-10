require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const { redisClient } = require("./config/cache");
const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/images");

const app = express();

const startServer = async () => {
  try {
    await redisClient.connect();
    connectDB();

    app.use(
      compression({
        level: 6,
        threshold: 100 * 1024,
        filter: (req, res) => {
          if (req.headers["x-no-compression"]) {
            return false;
          }
          return compression.filter(req, res);
        },
      })
    );

    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
          },
        },
        xssFilter: true,
      })
    );

    app.use(cors());
    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(
      "/api/auth",
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        message: "Too many requests, please try again later",
      }),
      authRoutes
    );
    app.use("/api/images", imageRoutes);

    app.get("/", (req, res) => {
      res.json({ message: "API is running..." });
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGTERM", async () => {
  console.log("SIGTERM received");
  await redisClient.quit();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received");
  await redisClient.quit();
  process.exit(0);
});
