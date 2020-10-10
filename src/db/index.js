const urlModel = require("../models/url");
const config = require("../config");

module.exports = class DbConn {
  static addUrlsToDb = async (data) => {
    try {
      let totalUrlCountInDb = await urlModel.countDocuments({});

      if (
        config.CRAWLER_URL_LIMIT == -1 ||
        totalUrlCountInDb < parseInt(config.CRAWLER_URL_LIMIT)
      ) {
        let url = await urlModel.create(data);
        return url;
      } else {
        console.log(`\n${totalUrlCountInDb} urls reached.\n`);
        process.exit();
      }
    } catch (error) {
      if (error && error.code === 11000) console.log("Duplicate key found.");
      else console.log(error);
    }
  };

  static increaseUrlCountAndMergeParams = async (data) => {
    try {
      for (let link of data) {
        await urlModel.findOneAndUpdate(
          { url: link.url },
          {
            $inc: { refCount: 1 },
            $addToSet: { params: link.params },
          }
        );
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  static filterUrlsAndSaveToDb = async (urls) => {
    try {
      let to_be_added = [],
        to_be_incremented = [];

      if (urls && Array.isArray(urls)) {
        for (let url of urls) {
          let item = await urlModel.findOne({ url: url.url });
          if (item) to_be_incremented.push(url);
          else to_be_added.push(url);
        }
      } else {
        console.log(urls);
      }
      await this.addUrlsToDb(to_be_added);
      await this.increaseUrlCountAndMergeParams(to_be_incremented);
    } catch (error) {
      console.log(error);
    }
  };

  static getNextUrlToBeScrapped = async () => {
    try {
      let item = await urlModel.findOneAndUpdate(
        { isCrawled: false },
        { $set: { isCrawled: true } }
      );
      return item;
    } catch (error) {
      console.log(error);
    }
  };

  static flushDb = async () => {
    try {
      await urlModel.deleteMany({});
      console.log("Database Cleaned For Fresh Start");
      return;
    } catch (error) {
      console.log(error);
    }
  };
};
