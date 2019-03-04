# LIRI-Bot

Language Interpretation and Recognition Interface Bot

## Overview

* [Environment Link](https://3mhurley.github.io/LIRI-Bot/)

This bot takes user input in the command line and executes a set group of commands:

* concert-this
  * Uses the Bands in Town API to look up events for the requested artist
  * Info delivered
    * Nave of the venue
    * Venue location
    * Date of the event
* spotify-this-song
  * Uses the Spotify API to look up the requested song
  * Info delivered
    * Artists
    * Song's name
    * Album name
    * Spotify preview link
  * Defaults to The Sign by Ace of Base if no movie is provided
* movie-this
  * Uses the OMDB API to look up the requested movie
  * Info delivered
    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotten Tomatoes Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie
  * Defaults to Mr. Nobody if no movie is provided
* do-what-it-says
  * Executes a command stored in the random.txt file

## API's

* [Bands in Town](https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/)
* [OMDB](http://www.omdbapi.com/)
* [Spotify](https://developer.spotify.com/)

## Installation Requirements

### Files

.env file

```env
# Spotify API keys

    SPOTIFY_ID=####
    SPOTIFY_SECRET=####
```

### Node Packages

* [axios](https://www.npmjs.com/package/axios/)
* [dotenv](https://www.npmjs.com/package/dotenv/)
* [fs](https://nodejs.org/api/fs.html/)
* [moment](https://www.npmjs.com/package/moment/)
* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api/)