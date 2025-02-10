const rateLimit = require("express-rate-limit");
const { redisClient } = require("../config/cache");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: (req) => {
    return `${req.ip}-${req.body.username}`;
  },
});

const tokenBlacklist = {
  async add(token, exp) {
    const timeToExpire = exp * 1000 - Date.now();
    if (timeToExpire > 0) {
      await redisClient.setEx(
        `bl_${token}`,
        Math.ceil(timeToExpire / 1000),
        "true"
      );
    }
  },

  async check(token) {
    return await redisClient.get(`bl_${token}`);
  },
};

const checkTokenBlacklist = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const isBlacklisted = await tokenBlacklist.check(token);
      if (isBlacklisted) {
        return res.status(401).json({ message: "Token inválido ou expirado" });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

const bruteForceProtection = async (req, res, next) => {
  const key = `login_attempts_${req.ip}`;

  try {
    const attempts = await redisClient.get(key);
    if (attempts && parseInt(attempts) >= 5) {
      return res.status(429).json({
        message: "Muitas tentativas. Conta temporariamente bloqueada.",
      });
    }

    if (attempts) {
      await redisClient.incr(key);
    } else {
      await redisClient.setEx(key, 900, "1");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginLimiter,
  tokenBlacklist,
  checkTokenBlacklist,
  bruteForceProtection,
};
