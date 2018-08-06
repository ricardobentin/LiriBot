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
        var params = { screen_name: 'BacanoNano' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error && response.statusCode === 200) {
                console.log("\n********************* Twitter Output Below *********************\n")
                for (var i = 0; i < 20; i++) {
                    console.log(`Tweet Number. ${20-i}: ${tweets[i].text}`);
                }
            }
        });
        break;
    case "spotify-this-song":
        if (process.argv[3] === undefined) {
            spotify.search({ type: 'track', query: 'Ace of Base - The Sign', limit: '1' }, function (err, data) {

                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("\n********************* Spotify Output Below *********************\n")
                console.log("**Alert**: You did not enter a song name. Here is a SIGN that you should enter a song title in your search.")
                console.log("Artist(s):", data.tracks.items[0].artists[0].name);
                console.log("Song Name:", data.tracks.items[0].name);
                console.log("Preview Link:", data.tracks.items[0].external_urls.spotify);
                console.log("Album:", data.tracks.items[0].album.name);
                // console.log(data.tracks.items);


            });
        }
        else {
            var query = process.argv[3];
            console.log("This is query", query);
            spotify.search({ type: 'track', query: query, limit: '1' }, function (err, data) {

                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("\n********************* Spotify Output Below *********************\n")
                console.log("Artist(s):", data.tracks.items[0].artists[0].name);
                console.log("Song Name:", data.tracks.items[0].name);
                console.log("Preview Link:", data.tracks.items[0].external_urls.spotify);
                console.log("Album:", data.tracks.items[0].album.name);
            });

        }
        break;
    default:
        console.log(`You ran a case you haven't configured yet`);
}

