require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var command = process.argv[2];
var queryInput = process.argv.slice(3).join(" ");
var divider = "\n========================================\n";

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

            let newSongArray = [
                "Artist: " + artistName,
                "Song: " + songName,
                "Preview URL: " + previewURL,
                "Album: " + albumName
            ].join("\n\n");

            console.log(newSongArray);
            console.log(divider);

            fs.appendFile("log.txt", newSongArray + divider, function (err) {
                if (err) throw err;
            });
        };
    });
};

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        };

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

                let newEventArray = [
                    lineup + " @ " + venueName,
                    "Location: " + venueLocation,
                    "Date: " + dateCoverted,
                ].join("\n\n");

                console.log(newEventArray);
                console.log(divider);

                fs.appendFile("log.txt", newEventArray + divider, function (err) {
                    if (err) throw err;
                });
            };
        })
        .catch(function (error) {
            console.log(error);
        });
};

function movieSearch() {

    if (queryInput === "") {
        queryInput = "mr.nobody";
    };

    let api_key = keys.omdb.api_key;
    let movieName = queryInput;
    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + api_key;

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

            let movieArray = [
                "Movie Name: " + movieTitle,
                "Released on: " + releaseDate,
                "IMBD Rating: " + imbdRating,
                "Rotten Tomatoes Rating: " + rottenTomatoes,
                "Filmed in: " + country,
                "Language: " + language,
                "Plot: " + plot,
                "Actors: " + actors
            ].join("\n\n");

            console.log(movieArray);

            fs.appendFile("log.txt", movieArray + divider, function (err) {
                if (err) throw err;
            });
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

