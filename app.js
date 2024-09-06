const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('ioredis');
const { rateLimiterMiddleware } = require('./rateLimiter');
const { processTaskQueue } = require('./taskQueue');

const app = express();
app.use(bodyParser.json());

const redis = new Redis();  // Redis connection

// Route to handle user tasks
app.post('/task', rateLimiterMiddleware, (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Adds task to the queue
  processTaskQueue(user_id);

  res.status(202).json({ message: `Task for user ${user_id} is queued` });
});

module.exports = app;
