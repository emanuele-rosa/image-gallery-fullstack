require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/images");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

app.use(helmet());

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  "/api/auth",
  authRoutes,
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
  })
);
app.use("/api/images", imageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
