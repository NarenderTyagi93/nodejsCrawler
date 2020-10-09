let mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

module.exports = new (class Connection {
  constructor() {
    this.MONGO_CONNECTION_URL =
      require("../config").MONGO_CONNECTION_URL ||
      "mongodb://localhost:27017/nodejsCrawler";
    this.connectionObj = null;
    this.mongoose();
  }

  mongoose() {
    if (this.connectionObj) return this.connectionObj;
    console.log(this.MONGO_CONNECTION_URL);
    this.connectionObj = mongoose.createConnection(
      this.MONGO_CONNECTION_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      (err) => {
        if (!err) console.log(" Database Connected Successfully");
        else console.log(err);
      }
    );
  }
})();
