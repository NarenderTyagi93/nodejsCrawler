module.exports = {
  BASE_URL: process.env.BASE_URL || "http://medium.com",
  HOST: process.env.HOST || "medium.com",
  MONGO_CONNECTION_URL:
    process.env.MONGO_CONNECTION_URL ||
    "mongodb://localhost:27017/nodejsCrawler",
  MAX_CONCURRENCY: process.env.MAX_CONCURRENCY || 5,
  CRAWLER_URL_LIMIT: process.env.CRAWLER_URL_LIMIT || 100, // Number of URLs after which the crawler will stop. -1 if you want it to run infinitely.
};
