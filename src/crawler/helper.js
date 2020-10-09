const axios = require("axios");
const cheerio = require("cheerio");

module.exports = class Helper {
  static getHyperlinksFromBody = (body) => {
    const $ = cheerio.load(body);
    const links = $("a");
    $(links).each((i, each) => {
      let href = $(each).attr("href");
      console.log(href);
    });
  };

  static requestUrlandGetHyperlinks = async (link) => {
    try {
      console.log("scrapping", link);
      const { data } = await axios.get("http://medium.com");
      return this.getHyperlinksFromBody(data);
    } catch (error) {
      throw error;
    }
  };
};
