# Node.js Task Queue with Rate Limiting

## Description
This project implements a Node.js API with rate limiting and task queueing using Redis. The API supports 1 task per second and 20 tasks per minute per user, with additional requests being queued.

## Requirements
- Node.js
- Redis

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
2. run node cluster. js , in the terminal.

3. And to check the requests, I used postman. ( method: post, [localhost](http://localhost:3000/task)) . structure was given in the assignment ( {"user_id":"123 })

## NPM Packages used in this project. 
1. express
2. dayjs    (used for formatting the date/ to beautify the date)
3. body-parser (used as middleware)
4. ioredis (used for interacting with redis)
5. rate-limiter-flexible (used for rate limiting)
    
