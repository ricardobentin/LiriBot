//to read and set any environment variables with the dotenv package
require("dotenv").config();
var request = require("request");
//importing the keys
var keys = require("./keys.js");
var Twitter = require('twitter')
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

switch (process.argv[2]) {
    case "my-tweets":
        var params = { screen_name: 'ricardobentin' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error && response.statusCode === 200) {
                console.log("\n********************* Twitter Output Below *********************\n")
                for (var i = 0; i < 20; i++) {
                    console.log(`Tweet Number. ${i}: ${tweets[i].text}`);
                }
            }
        });
        break;
    default:
        console.log(`You ran a case you haven't configured yet`);
}

