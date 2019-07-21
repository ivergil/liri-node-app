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
        song === "Try it again"
    }

    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            var data = response.data;
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                // console.log(i);
                console.log("Artist(s): " + songs[i].artists.map(getArtistNames));
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
            console.log("Year: " + data.Year);
            console.log("Movie Rated: " + data.Rated);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
    );
};
