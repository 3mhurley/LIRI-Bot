# LIRI-Bot
Language Interpretation and Recognition Interface Bot

## Overview

* Environment Link: [https://3mhurley.github.io/LIRI-Bot/.](https://3mhurley.github.io/LIRI-Bot/.)

This bot takes user input in the command line and executes a set group of commands:
* concert-this
  * Uses the Bands in Town API to look up events for the requested artist
* spotify-this-song
  * Uses the Spotify API to look up the requested song
* movie-this
  * Uses the OMDB API to look up the requested movie
* do-what-it-says
  * Executes a command stored in the random.txt file

## API's
* Bands in Town
* OMDB
* Spotify

## Node Packages
* axios
* dotenv
* fs
* moment
* node-spotify-api