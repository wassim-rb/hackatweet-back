var express = require("express");
const Tweet = require("../models/tweets");
var router = express.Router();
require("./models/connection");

const { checkBody } = require("../modules/checkBody");

router.post("/tweetuser", (req, res) => {
  if (!checkBody(req, body, ["description"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  } else {
    Tweet.findOne({ description: req.body.description }).then((data) => {
      const newTweet = new Tweet({
        user: req.body.userId,
        description: req.body.description,
        date: Date,
      });

      newTweet.save().then((newDoc) => {
        res.json({ result: true, tweet: newDoc });
      });
    });
  }
});
