
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");


//spotify search function
function spotifySearch() {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: query }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var searchResults = data.tracks.items;
        // console.log(searchResults);

        for (var i = 0; i < searchResults.length; i++) {

            var newSong = searchResults[i];

            var artistName = newSong.artists[0].name;
            var songName = newSong.name;
            var previewURL = newSong.preview_url;
            var albumName = newSong.album.name;
            var spacer = "======================="

            console.log(artistName);
            console.log(songName);
            console.log(previewURL);
            console.log(albumName);
            console.log(spacer);
        }
    });
}





//run logic
if (command === "spotify-this") {
    spotifySearch();
}
else {
    console.log("invalid search command");
}

