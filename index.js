//GifBot Setup
var Twit = require('twit');
var twitInfo = require('./config.js');
var newRetweet = new Twit(twitInfo);

//hashtags to search for
var reactionGifHashtag = '#reactiongif, #reactiongifs';

//sort the tweets with reactionGifHashtag
var retweetGifs = newRetweet.stream('statuses/filter', {track: reactionGifHashtag})

console.log("Bot is now retweeting gifs!");

retweetGifs.on('tweet', function(tweet) {
    console.log("Retweeting" + tweet.id);
  newRetweet.post('statuses/retweet/:id', {id: tweet.id_str },
    function success() {
      if (tweet.text.toLowerCase().indexOf("fav") > -1) {
        newRetweet.favorite(tweet.id_str);
          console.log("Favorited", tweet.id);
        }

      });

    function error(error, data, response) {
      if (error){
        console.warn("Error:" + error);
        return;
        }
      }
});
