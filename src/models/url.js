const mongoose = require("mongoose");
const dbConnObj = require("../db/connection");

const url_schema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    refCount: {
      type: Number,
      required: true,
      default: 1,
    },
    params: [
      {
        type: String,
        required: true,
      },
    ],
    isCrawled: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    strict: true,
  }
);

module.exports = dbConnObj.model("urls", url_schema);
