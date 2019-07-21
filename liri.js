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


var userArtist = function (artist) {
    return artist.name;
};

var userSong = function (song) {
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
                console.log("-----------------------------------");
            }

            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        });
};