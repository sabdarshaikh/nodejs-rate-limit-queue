const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');

const redisClient = new Redis();

// Configuration of the rate limiter
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate-limit',
  points: 20, // 20 tasks per minute
  duration: 60, // per 60 seconds (1 minute)
  blockDuration: 1, // Block for 1 second if more than 1 task per second is hit
});

// Middleware to check rate limits
const rateLimiterMiddleware = async (req, res, next) => {
  const userId = req.body.user_id;

  try {
    await rateLimiter.consume(userId, 1); // Consume 1 point
    next(); // Allow the request to proceed
  } catch (rejRes) {
    // Handle rate-limited request
    res.status(429).json({
      message: 'Rate limit exceeded. Try again later.',
    });
  }
};

module.exports = { rateLimiterMiddleware };
