const fs = require('fs');

async function task(user_id) {
  const logMessage = `${user_id} - task completed at - ${Date.now()}\n`;

  // Log task completion to a file
  fs.appendFile('task_log.txt', logMessage, (err) => {
    if (err) throw err;
  });

  console.log(logMessage);
}

module.exports = { task };
