const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  date: Date,
  description: String,
  token: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
