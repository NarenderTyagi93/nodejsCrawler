module.exports = {
  BASE_URL: process.env.BASE_URL || "http://medium.com",
  HOST: process.env.HOST || "medium.com",
  MONGO_CONNECTION_URL:
    process.env.MONGO_CONNECTION_URL ||
    "mongodb://localhost:27017/nodejsCrawler",
};
