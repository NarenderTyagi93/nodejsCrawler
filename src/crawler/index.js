const config = require("../config");
const scrapHelper = require("./helper");

const db = require("../db");

module.exports = new (class Crawler {
  constructor() {
    this.initCrawler();
  }

  initCrawler = async () => {
    try {
      await db.flushDb();
      await db.addUrlsToDb({
        url: config.BASE_URL,
        params: [],
      });

      await this.runPromiseForConcurrency();
    } catch (error) {
      console.log(error);
    }
  };

  runPromiseForConcurrency = async () => {
    let promises = [];
    for (let i = 0; i < parseInt(config.MAX_CONCURRENCY); i++) {
      let item = await db.getNextUrlToBeScrapped();
      if (item) promises.push(this.scrapHyperLinks(item.url));
    }
    await Promise.all(promises);
    return await this.runPromiseForConcurrency();
  };

  scrapHyperLinks = async (link) => {
    try {
      let urls = await scrapHelper.requestUrlandGetHyperlinks(
        link,
        config.HOST
      );
      if (urls && Array.isArray(urls)) {
        await db.filterUrlsAndSaveToDb(urls);
      } else {
        console.log("found nothing");
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
})();
