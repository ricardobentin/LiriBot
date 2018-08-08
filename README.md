# LiriBot
This application requires packages to run so please be sure to read the package.json and install all of the necessary packages.
Further, the Twitter and Spotify packages require authentication. Please create your own .env file with your public and private keys for twitter and spotify please store the keys in the variables described below. This .env file will be used by the `dotenv` package to set environment variables to the global `process.env` object in node. This is specific to each environment.

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```



This node application is mean to utilize the following commands:

* <strong>my-tweets</strong> - will retrieve the users last 20 tweets
* <strong>spotify-this-song</strong> <"insert song title here> - will retrieve the artist, song name, preview link and album name from spotify. If no song name is passed, you will only see information for The Sign by Ace of base.
* <strong>movie-this</strong> <"insert movie title here"> - will retrieve the movie title, year of release, IMDB rating, Rotten tomatoes rating, country of production, movie language, movie plot, and actors / acrtresses in the movie from OMDB. If no movie title is passed, you will only see information or Mr. Nobody.
* <strong>do-what-it-says</strong> - leverages the file random.txt to retrieve the information for either a song from spotify or a movie from OMDB base on what is written in the random.txt file in the following format: spotify-this-song - <"insert song title here"> or movie-this <"insert movie title here">. An omission of either song or movie title will give you either The Sign by Ace of Base or Mr. Nobody as a result.

The log.txt file will log all of the output from the queries you send to the application.

happy interfacing!
