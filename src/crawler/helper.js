const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("query-string");

module.exports = class Helper {
  static extractUrlAndParamsFromLink = (link) => {
    let items = link.split("?");
    let params =
      items && Array.isArray(items) && items[1]
        ? Object.keys(qs.parse(items[1]))
        : [];
    return { url: items[0], params };
  };

  static getHyperlinksFromBody = (body, host) => {
    const $ = cheerio.load(body);
    const links = $("a");
    let uniqueLinks = [];
    $(links).each((i, each) => {
      let link = $(each).attr("href");
      let { url, params } = this.extractUrlAndParamsFromLink(link ? link : "");

      // If the URL is a protocol relative URI, or requires authentication then ignore it entirely.
      if (url.startsWith("//") || url.endsWith("/me") || url.includes("/me/")) {
        return [];
      }

      url = url.startsWith("/") ? `http://${host}${url}` : url;
      let has_right_protocol =
        url.startsWith("https://") || url.startsWith("http://");
      if (!url.includes(host) || !has_right_protocol) {
        return [];
      }
      let index = uniqueLinks.findIndex((elem) => elem.url === url);
      if (index === -1) uniqueLinks.push({ url, params });
      else
        uniqueLinks[index].params = Array.from(
          new Set(...uniqueLinks[index].params, ...concat(params))
        );
    });
    return uniqueLinks;
  };

  static requestUrlandGetHyperlinks = async (link, host) => {
    try {
      console.log("scrapping", link);
      const { data } = await axios.get("http://medium.com");
      return this.getHyperlinksFromBody(data, host);
    } catch (error) {
      throw error;
    }
  };
};
