// code to read and set any environment variables with the dotenv package
require("dotenv").config();
// code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// Import all the required NPM packege.
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// Access to my Spotify keys information
var spotify = new Spotify(keys.spotify);


var artistSearch = function (artist) {
    return artist.name;
};

var spotifySong = function (song) {
    if (song === undefined) {
        song === "The Sign"
    }

    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            var data = response.data;
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                // console.log(i);
                console.log("Artist(s): " + songs[i].artists.map(artistSearch));
                console.log("Song name: " + songs[i].name);
                console.log("Preview song: " + songs[i].preview_url);
                console.log("Album name: " + songs[i].album.name);
                console.log("*******************************");
            }

            // console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        });
};

var bandSearch = function (artist) {
    var axiosURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(axiosURL)
        .then(function (response) {
            var data = response.data
            // handle success
            if (data.length === 0) {
                console.log("Please check your Artist: " + artist + " No results found")
                return;
            }

            console.log("There are the next concerts of " + artist + ":");

            for (var i = 0; i < data.length; i++) {
                console.log("City: " + data[i].venue.city);
                console.log("Region/Country: " + data[i].venue.region || data[i].venue.country);
                console.log("Place: " + data[i].venue.name);
                console.log("Time :" + moment(data[i].venue.datetime).format("MM/DD/YYY"));
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};

var movieSearch = function (movie) {
    if (movie === undefined) {
        movie = "Mr. Nobody";
    }
    var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=da2b29a9";
    axios.get(omdbURL).then(
        function (response) {
            var data = response.data;

            console.log("Movie Title: " + data.Title);
            console.log("Year the movie came out: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data[i].Ratings[1].Value);
            console.log("Country was produced: " + data.Country);
            console.log("Language of the movie: " + data.Language);
            console.log("Plot of the movie: " + data.Plot);
            console.log("Actors: " + data.Actors);
        }
    );
};

var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);

        var newArray = data.split(",");

        if (newArray.length === 2) {
            pick(newArray[0], newArray[1]);
        } else if (newArray.length === 1) {
            pick(newArray[0]);
        }
    });
};

var choose = function (casePicked, functionPicked) {
    switch (casePicked) {

        case "spotify-this-song":
            spotifySong(functionPicked);
            break;
        case "concert-this":
            bandSearch(functionPicked);
            break;
        case "movie-this":
            movieSearch(functionPicked);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI doesn't know that");
    }
};
