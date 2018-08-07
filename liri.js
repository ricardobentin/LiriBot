//to read and set any environment variables with the dotenv package
require("dotenv").config();
//require file system to read or write to files
var fs = require("fs");
// requiring the request node package and saving it as a variable
var request = require("request");
//importing the keys.js and what it is exporting
var keys = require("./keys.js");
//requiring the twitter node package and saving it to a variable
var Twitter = require('twitter')
//requiring the spotify node package and saving it to a variable
var Spotify = require('node-spotify-api');
//saving both the twitter and spotify keys as variables
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
//sitch/case logic for what happens when the user types in a command after node liri.js
switch (process.argv[2]) {
    case "my-tweets":
        var params = { screen_name: 'BacanoNano' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error && response.statusCode === 200) {
                console.log("\n********************* Twitter Output Below *********************\n")
                for (var i = 0; i < 20; i++) {
                    console.log(`Tweet Number. ${20 - i}: ${tweets[i].text}`);
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
    case "movie-this":
        var movieName = "";
        var queryUrl = "";
        if (process.argv[3] === undefined) {
            // Grab or assemble the movie name and store it in a variable called "movieName"
            movieName = "Mr. Nobody";

            // Then run a request to the OMDB API with the movie specified
            queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


            // This line is just to help us debug against the actual URL.
            console.log(queryUrl);

            // Then create a request to the queryUrl
            request(queryUrl, function (error, response, body) {
                //console.log the response to see what the JSON looks like
                // console.log("This is response:", response);
                // If the request is successful
                if (!error && response.statusCode === 200) {
                    console.log("\n********************* OMDB Output Below *********************\n")
                    console.log("**Alert**: You did not enter a movie title.")
                    console.log("Movie Title: ", JSON.parse(body).Title);
                    console.log("Year of Release: ", JSON.parse(body).Year);
                    console.log("IMDB Rating: ", JSON.parse(body).Ratings[0].Value);
                    console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
                    console.log("Country Where Movie Was Produced: ", JSON.parse(body).Country);
                    console.log("Movie Language: ", JSON.parse(body).Language);
                    console.log("Movie Plot: ", JSON.parse(body).Plot);
                    console.log("Actors / Actresses in Movie: ", JSON.parse(body).Actors);
                }
                else {
                    console.log("You have error: ", error);
                }
            });
        }
        else {
            // Grab or assemble the movie name and store it in a variable called "movieName"
            movieName = process.argv[3];

            // Then run a request to the OMDB API with the movie specified
            queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


            // This line is just to help us debug against the actual URL.
            console.log(queryUrl);

            // Then create a request to the queryUrl
            request(queryUrl, function (error, response, body) {
                //console.log the response to see what the JSON looks like
                // console.log("This is response:", response);
                // If the request is successful
                if (!error && response.statusCode === 200) {
                    console.log("\n********************* OMDB Output Below *********************\n")
                    console.log("Movie Title: ", JSON.parse(body).Title);
                    console.log("Year of Release: ", JSON.parse(body).Year);
                    console.log("IMDB Rating: ", JSON.parse(body).Ratings[0].Value);
                    console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
                    console.log("Country Where Movie Was Produced: ", JSON.parse(body).Country);
                    console.log("Movie Language: ", JSON.parse(body).Language);
                    console.log("Movie Plot: ", JSON.parse(body).Plot);
                    console.log("Actors / Actresses in Movie: ", JSON.parse(body).Actors);
                }
                else {
                    console.log("You have error: ", error);
                }
            });
        }
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            console.log(dataArr);
            switch (`${dataArr[0]}`) {
                case "spotify-this-song":
                    spotify.search({ type: 'track', query: dataArr[1], limit: '1' }, function (err, data) {

                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        console.log("\n********************* Spotify Output Below *********************\n")
                        console.log("Artist(s):", data.tracks.items[0].artists[0].name);
                        console.log("Song Name:", data.tracks.items[0].name);
                        console.log("Preview Link:", data.tracks.items[0].external_urls.spotify);
                        console.log("Album:", data.tracks.items[0].album.name);
                        // console.log(data.tracks.items);
                    });
                    break;
                case "movie-this":
                    // Grab or assemble the movie name and store it in a variable called "movieName"
                    movieName = dataArr[1];

                    // Then run a request to the OMDB API with the movie specified
                    queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


                    // This line is just to help us debug against the actual URL.
                    console.log(queryUrl);

                    // Then create a request to the queryUrl
                    request(queryUrl, function (error, response, body) {
                        //console.log the response to see what the JSON looks like
                        // console.log("This is response:", response);
                        // If the request is successful
                        if (!error && response.statusCode === 200) {
                            console.log("\n********************* OMDB Output Below *********************\n")
                            console.log("Movie Title: ", JSON.parse(body).Title);
                            console.log("Year of Release: ", JSON.parse(body).Year);
                            console.log("IMDB Rating: ", JSON.parse(body).Ratings[0].Value);
                            console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
                            console.log("Country Where Movie Was Produced: ", JSON.parse(body).Country);
                            console.log("Movie Language: ", JSON.parse(body).Language);
                            console.log("Movie Plot: ", JSON.parse(body).Plot);
                            console.log("Actors / Actresses in Movie: ", JSON.parse(body).Actors);
                        }
                        else {
                            console.log("You have error: ", error);
                        }
                    });
                    break;
                default:
                    console.log("The Random TXT file does not support this entry, please try again.");
            }
        });

        break;
    default:
        console.log(`You ran a case you haven't configured yet`);
}

