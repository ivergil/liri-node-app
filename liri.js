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