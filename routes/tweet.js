var express = require("express");
var router = express.Router();
const Tweet = require("../models/tweets");
//router post ma donnée
router.post("/tweetUser", (req, res) => {
  //console.log(req.body.description);
  if (req.body.description !== "") {
    Tweet.findOne({ description: req.body.description }).then((data) => {
      const newTweet = new Tweet({
        user: req.body.userId,
        description: req.body.description,
        date: new Date(),
      });

      newTweet.save().then(() => {
        res.json({ result: true, tweet: newTweet });
      });
    });
  } else {
    res.json({ result: false });
  }
});

//router get recupere les tweet present dans ma database
router.get("/gettweets", (req, res) => {
  Tweet.find().then((data) => {
    console.log(data);
    if (!data) {
      res.json({ result: false });
    } else {
      res.json({ result: data });
    }
  });
});

// router delete renvoie une foi suprimé les autres tweet
router.delete("/:tweetId", (req, res) => {
  Tweet.deleteOne({ _id: req.params.tweetId }).then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
      // document successfully deleted
      Tweet.find().then((data) => {
        res.json({ result: true, Tweet: data });
      });
    } else {
      res.json({ result: false, error: "Tweet not found" });
    }
  });
});
module.exports = router;
