const config = require("../config");
const scrapHelper = require("./helper");

module.exports = new (class Crawler {
  constructor() {
    this.initCrawler();
  }

  initCrawler = async () => {
    try {
      await this.scrapHyperLinks(config.BASE_URL);
    } catch (error) {
      console.log(error);
    }
  };

  scrapHyperLinks = async (link) => {
    try {
      let urls = await scrapHelper.requestUrlandGetHyperlinks(
        link,
        config.HOST
      );
      if (urls && urls.length) {
        console.log(JSON.stringify(urls));
      } else {
        console.log("found nothing");
      }
    } catch (error) {
      console.log(error);
    }
  };
})();
