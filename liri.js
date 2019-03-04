// Libs and such
require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
// var inquirer = require("inquirer");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


// liri commands


//  concert-this -> node liri concert-this <artist/band name here>
//   bands in town -> "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
//   Venue name; Venue location; Event Date;
function eventLook(params) {
    var artistName;
    var queryUrl;

    if (params === "") {
        artistName = "Ace of Base";
    } else {
        artistName = params;
    }

    queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function(rsp) {
            console.log(``);
            console.log(`Oh ${artistName} let me see...`);
            rsp.data.forEach((ele,i) => {
                var event = rsp.data[i];
                var eventLog =  `Venue: ${event.venue.name}\n` +
                                `Location: ${event.venue.city}, ${event.venue.country}\n` +
                                `Date: ${moment(event.datetime).format("MM/DD/YYYY")}`;
                                // `Get tickets here: ${event.offers[0].url}`;
                console.log(``);
                console.log(eventLog);
                console.log(``);
                console.log(`------------`);
                logIt(eventLog,'concert-this');
            });
        }
    );
}


//  spotify-this-song -> node liri.js spotify-this-song '<song name here>'
//   node-spotify-api
//   Artist; Song name; Spotify preview link; Album
//   Default - The Sign by Ace of Base
function spotIt(params) {
    var songName;

    if (params === "") {
        songName = "The Sign by Ace of Base";
    } else {
        songName = params;
    }

    spotify
        .search({ type: 'track', query: songName, limit: 1 })
        .then(function(response) {
            console.log(``);
            console.log(`Oh ${songName} let me see...`);
            response.tracks.items.forEach((ele,i) => {
                var song = response.tracks.items[i];
                var songLog = `Artist: ${song.artists[0].name}\n` +
                              `Song name: ${song.name}\n` +
                              `Album: ${song.album.name}\n` +
                              `Preview: ${song.preview_url}`;
                console.log(``);
                console.log(songLog);
                console.log(``);
                console.log(`------------`);
                logIt(songLog,'spotify-this-song');
            });
        })
        // .catch(function(err) {
        //     console.log(err);
        // });

}


//  movie-this -> node liri.js movie-this '<movie name here>'
//   OMDB -> "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
//   Movie title; Release year; IMDB rating; Rotten Tomatoes rating; Production country; Language; Plot; Actors;
//   Default - Mr. Nobody
function movieLook(params) {
    var queryUrl;
    var movieName;

    if (params === "") {
        movieName = "Mr Nobody";
    } else {
        movieName = params;
    }

    queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function(rsp) {
            console.log(``);
            console.log(`Oh ${movieName} let me see...`);
            var movie = rsp.data;
            var movieLog =  `Movie: ${movie.Title}\n` +
                            `Release: ${moment(movie.Released, 'DD MMM YYYY').format('YYYY')}\n` +
                            `IMDB rating: ${movie.Ratings[0].Value}\n` +
                            `Rotten Tomatoes rating: ${movie.Ratings[1].Value}\n` +
                            `Country: ${movie.Country}\n` +
                            `Language: ${movie.Language}\n` +
                            `Plot: ${movie.Plot}\n` +
                            `Actors: ${movie.Actors}`;
            console.log(``);
            console.log(movieLog);
            console.log(``);
            console.log(`------------`);
            logIt(movieLog,'movie-this');
        }
    );
}


//  do-what-it-says
//   fs to read and act on the liri command in random.txt
function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {return console.log(error);}
        var dataArr = data.split(",");
        execute(dataArr[0],dataArr[1]);
    });
}


// logs
function logIt(text,source) {
    var log = `\n\n--------------------\n${source}\n----------\n${text}`
    fs.appendFile("log.txt", log, function(err) {
        if (err) {return console.log(err);}
    });
}


// LIRI BOT ACTIVATED

var action = process.argv[2];
var query = process.argv.slice(3).join(" ");

function execute(action,query) {
    switch (action) {
        case 'concert-this':
            eventLook(query);
            break;
        case 'spotify-this-song':
            spotIt(query);
            break;
        case 'movie-this':
            movieLook(query);
            break;
        case 'do-what-it-says':
            doIt();
            break;
        // case 'lazy':
        //     break;
        case 'help':
            console.log(` \nconcert-this + <artist name>\n` +
            `  - finds events for the queried artist\n\n` +
            `spotify-this-song + <song name>\n` +
            `  - finds spotify information and a link to the song\n\n` +
            `movie-this + <artist name>\n` +
            `  - returns information for the queried movie\n\n` +
            `do-what-it-says\n` +
            `  - try it to find out :)\n`);
            // console.log(`Yea I'm lazy... give me an easier interface...`);
            // console.log(`  - ok ok use command lazy`);
            break;
        default:
            console.log(`I don't know that command...\n` +
            `Type help for a list of commands.`);
    }
}

execute(action,query);

// inquirer
//     .prompt([
//         {
//             type: "list",
//             message: "What is do you want to do?",
//             choices: ["Find a concert","Look up a song","Look up a movie","The do what it says thing"],
//             name: "color"
//         },
//         {
//             type: "input",
//             message: "What are you wanting to look up?",
//             name: "search"
//         },
//         {
//             type: "confirm",
//             message: "Are you sure:",
//             name: "confirm",
//             default: true
//         }
//     ])
//     .then(function(inquirerResponse) {
//         if (inquirerResponse.confirm) {
            
//         } else {
            
//         }
//     });