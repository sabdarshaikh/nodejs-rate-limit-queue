const Redis = require('ioredis');
const redis = new Redis();
const fs = require('fs');
const dayjs = require('dayjs');

// Task processor: logs task completion
async function processTask(user_id) {
  const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const logMessage = `${user_id} - task completed at - ${formattedDate}\n`;

  // Append log to a file
  fs.appendFile('task_log.txt', logMessage, (err) => {
    if (err) throw err;
  });
}

// Add task to the queue
async function processTaskQueue(user_id) {
  // Push task to the Redis queue
  await redis.rpush(`task_queue_${user_id}`, JSON.stringify({ user_id }));

  // Process task
  const task = await redis.lpop(`task_queue_${user_id}`);
  if (task) {
    const parsedTask = JSON.parse(task);
    processTask(parsedTask.user_id);
  }
}

module.exports = { processTaskQueue };
