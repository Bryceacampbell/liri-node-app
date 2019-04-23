require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var command = process.argv[2];
var queryInput = process.argv.slice(3).join(" ");

function spotifySearch() {

    if (queryInput === "") {
        queryInput = "the sign";
    }

    var spotify = new Spotify(keys.spotify)
    spotify.search({ type: 'track', query: queryInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let searchResults = data.tracks.items;

        for (var i = 0; i < searchResults.length; i++) {

            let newSong = searchResults[i];
            let artistName = newSong.artists[0].name;
            let songName = newSong.name;
            let previewURL = newSong.preview_url;
            let albumName = newSong.album.name;

            console.log("Artist: " + artistName);
            console.log("Song: " + songName);
            console.log("Preview URL: " + previewURL);
            console.log("Album: " + albumName);
            console.log("====================");
        }
    });
};

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        let dataArr = data.split(",");
        command = dataArr[0];
        queryInput = dataArr[1];

        commandChecker();

    });
};

function concertSearch() {

    let api_key = keys.bandsInTown.api_key;
    let queryURL = "https://rest.bandsintown.com/artists/" + queryInput + "/events?app_id=" + api_key;

    axios.get(queryURL)
        .then(function (response) {

            let concertData = response.data;

            for (let i = 0; i < concertData.length; i++) {

                let newEvent = concertData[i];
                let lineup = newEvent.lineup[0];
                let newVenue = newEvent.venue;
                let venueName = newVenue.name;
                let venueCountry = newVenue.country;
                let venueCity = newVenue.city;
                let venueRegion = newVenue.region;
                let venueLocation = venueCity + ", " + venueRegion + " - " + venueCountry;
                let dateFormat = "YYYY-MM-DD";
                let dateTime = newEvent.datetime;
                let dateCoverted = moment(dateTime).format(dateFormat);

                console.log(lineup + " @ " + venueName);
                console.log("Location: " + venueLocation);
                console.log("Date" + dateCoverted);
                console.log("====================");

            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

function movieSearch() {

    if (queryInput === "") {
        queryInput = "mr.nobody";
    }

    var api_key = keys.ombd.api_key;
    var movieName = queryInput;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + api_key;

    axios.get(queryUrl)
        .then(function (response) {

            let movieData = response.data;

            let movieTitle = movieData.Title;
            let releaseDate = movieData.Released;
            let imbdRating = movieData.imdbRating;
            let rottenTomatoes = movieData.Ratings[1].Value;
            let country = movieData.Country;
            let language = movieData.Language;
            let plot = movieData.Plot;
            let actors = movieData.Actors;

            console.log("Movie Name: " + movieTitle);
            console.log("Released on: " + releaseDate);
            console.log("IMBD Rating: " + imbdRating);
            console.log("Rotten Tomatoes Rating: " + rottenTomatoes);
            console.log("Filmed in: " + country);
            console.log("Language: " + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);

        })
        .catch(function (error) {
            console.log(error);
        });

};

var commandChecker = function () {

    if (command === "spotify-this-song") {
        spotifySearch();
    }
    else if (command === "movie-this") {
        movieSearch();
    }
    else if (command === "concert-this") {
        concertSearch();
    }
    else if (command === "do-what-it-says") {
        doWhatItSays();
    }
    else {
        console.log("invalid search command");
    };

};

commandChecker();

