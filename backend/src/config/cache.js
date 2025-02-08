const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

console.log(
  "Tentando conectar ao Redis em:",
  process.env.REDIS_URL || "redis://localhost:6379"
);

redisClient.on("error", (err) => console.log("Redis Client Error:", err));
redisClient.on("connect", () =>
  console.log("Redis Client Connected Successfully")
);

const cacheMiddleware = (duration) => async (req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  const key = `cache:${req.originalUrl}`;

  try {
    const cachedResponse = await redisClient.get(key);

    if (cachedResponse) {
      return res.json(JSON.parse(cachedResponse));
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      redisClient.setEx(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };

    next();
  } catch (error) {
    console.error("Cache error detalhado:", error);
    next();
  }
};

module.exports = { redisClient, cacheMiddleware };
