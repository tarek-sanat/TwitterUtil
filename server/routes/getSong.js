var express = require('express');
var router = express.Router();
var request = require("request");
var Twitter = require('twitter');
var getVideo = require('../helpers/getVideo')
var axios = require('axios')
require('dotenv').config()
/* GET home page. */
var client = new Twitter({
  consumer_key: process.env.Twitter_Key,
  consumer_secret: process.env.Twitter_KeySecret,
  access_token_key: process.env.Twitter_Access_Token,
  access_token_secret: process.env.Twitter_Access_Token_Secret
});


// Gei video Route returns the mp4 link to a video given an ID
router.get('/twitter', function(req, res, next){
    client.get('statuses/show/',{id:req.query.id, tweet_mode:'extended'}, function(error, tweet, response) {
      try{
        if(tweet['extended_entities']['media'][0]['type'] === 'video'){
          let videos = getVideo(tweet)
          res.send(videos)
        } else{
          res.send('error tweet not found')
        }
      } catch{
        res.send('error tweet not found')
      }
      
    });
})

// Find song route, returns the name of the song and other info about the song 
router.get('/', async function(req, res, next) {
  var data = {
    'url': req.query.url,
    'return': 'apple_music,spotify',
    'api_token': process.env.api_token
  };
  request({
    uri: 'https://api.audd.io/',
    form: data,
    method: 'POST'
  }, async function (err, response, body) {
    
      var bodyJSON = JSON.parse(body)
      if(bodyJSON['result'] !== null){
        var song = [bodyJSON['result']['artist'], bodyJSON['result']['title'], bodyJSON['result']['album']]
        //lil%20nax%20x%20call%20me%20by%20your%20name
        var a = song[0].replaceAll(' ', '%')+ '%' + song[1].replaceAll(' ','%')+ '%' + song[2].replaceAll(' ','%');
        var ytSong = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${a}&key=${process.env.Youtube_Key}`)
        song.push(ytSong['data']['items'][0]['id']['videoId'])
        song.push(ytSong['data']['items'][0]['snippet']['thumbnails']['high']['url'])
        res.send(song)
      } else{
        res.send(null)
      }
      
  });
    
  });

  
module.exports = router;
