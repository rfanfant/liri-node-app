require("dotenv").config();
// Grab the axios package...
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);


//////////////////////////////////////////////////////////////////////////////////////////
// processRandomText(dataArr) - called to execute commands in file Random.txt.A switch  //
//     statement to process either of the following commands: 1) concert-this           //
//     2)spotify-this-song    3)movie-this 4) do-what-it says                           //                                     // 
//////////////////////////////////////////////////////////////////////////////////////////
function processRandomText(dataArr) {

    var newArray = dataArr.split(" ");

    var search = newArray[0];
    var term = newArray.slice(1).join(" ");

    console.log("Search: " + search);
    console.log("Term: " + term);

    switch (search) {

        case "concert-this":
            {
                if (term) {
                    runConcertThis(term);
                }
                else {
                    console.log("No input paramater specified with command concert-this.")
                }
            }
            break;
        case "spotify-this-song":
            {
                if (term) {
                    runSpotifyThisSong(term);
                }
                else {
                    console.log("No input paramater specified with command spotify-this-song.")
                    console.log("Therefore defaulting to The Sign by Ace of Base");
                    runSpotifyThisSong("The Sign");
                }
            }
            break;

        case "movie-this":
            {
                if (term)
                    runMovieThis(term);
                else
                    runMovieThis("Mr. Nobody")
                break;
            }
        case "do-what-it-says":
            {
                runDoWhatItSays();
                break;
            }
        default:
            console.log("Command line error - unrecognized command");
            break;
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// runConcertThis() - searches spotify's Bands In Town Artist Events API for an artist
//    and renders the following inofrmation about each event ot the terminal:
//    1) Venue naame 2) Venue location 3) Date of the Event (MM/DD/YYYY)
///////////////////////////////////////////////////////////////////////////////////////

function runConcertThis(inputParam) {
    console.log("running concert this. argument is: " + inputParam);

    let urlString = "https://rest.bandsintown.com/artists/" + inputParam + "/events?app_id=codingbootcamp"

    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    axios
        .get(urlString)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            //console.log(response.data);
            console.log("Upcoming events for " + inputParam);
            console.log("\n");

            for (const key in response.data) {
                var eventName = response.data[key].venue.name;
                var eventCity = response.data[key].venue.city;
                var eventState = response.data[key].venue.region;
                var eventCountry = response.data[key].venue.country;
                var eventLocation = eventCity + ", " + eventState + "   Country: " + eventCountry;
                var venueDate = moment(response.data[key].datetime).format("L");

                console.log("Event Name: " + eventName);
                console.log("Venue Location: " + eventLocation);
                console.log("Date: " + venueDate);
                console.log("\n");
            }

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

///////////////////////////////////////////////////////////////////////////////////////
// runSpotifyThisSong() - uses Spotify API to display the following information about
//    the song in the terminal/bash window -  1) Artist(s) 2) The song's name 
//    3) A preview link of the song from Spotify 4) The album that the song is from .
//    If no song is provided , the song "The Sign" by Ace of Base will be displayed.
///////////////////////////////////////////////////////////////////////////////////////

function runSpotifyThisSong(inputParam) {
    console.log("running spotify this song. Input parameter is: " + inputParam);

    spotify.search({ type: 'track', query: inputParam }, function (err, response) {
        if (err) {
            return console.log('Error occurred in runSpotifyThisSong(): ' + err);
        }

        for (var i =0; i < response.tracks.items.length; i++) {

            var artistArr = function (artist) {
                return artist.name;
            }

            console.log("Song name: " + response.tracks.items[i].name);
            console.log("Preview: " + response.tracks.items[i].preview_url);
            console.log("Album: " + response.tracks.items[i].album.name);
            console.log("Artist(s): " + response.tracks.items[i].album.artists.map(artistArr));
            console.log("\n");
        }

    });
};

///////////////////////////////////////////////////////////////////////////////////////
// runMovieThis() - searches OMDB API for the following information about the movie- 
//     1) Title of the movie 2)Year the movie came out 3) IMDB rating of the movie 
//     4) Rotten Tomatoes Rating of the movie. 5) Country where the movie was produced
//     6) Language of the movie 7) Plot of the movie 8) Actors in the movie
//     If the user doesn't enter a movie the proguram will output data for the movie
//     "Mr. Nobody"
///////////////////////////////////////////////////////////////////////////////////////

function runMovieThis(inputParam) {
    console.log("running movie this. Input parameter is: " + inputParam);

    let urlString = "http://www.omdbapi.com/?apikey=trilogy&"

    if (inputParam === "Mr. Nobody") {
        urlString += "i=tt0485947";
    }
    else {
        urlString += "t=" + inputParam + "&type=movie";
    }

    console.log(urlString);

    axios
        .get(urlString)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);

            console.log("Movie Title: " + response.data.Title);

            console.log("Year released: " + response.data.Year);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Country produced: " + response.data.Country);
            console.log("Language: " + response.data.Country);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

};


///////////////////////////////////////////////////////////////////////////////////////
// runDoWhatItSays() - using the 'fs' Node package, LIRI application will take the text 
//    inside of random.txt and then us it to call one of the LIRI commands.
//    * its should run "spotify-this-song" for "I Want it that Way", as follows
//      the text in random.txt. 
//    * edit the text in random.txt to test out the feature for movie-this and 
//     concert this
///////////////////////////////////////////////////////////////////////////////////////

function runDoWhatItSays() {
    console.log("running do what it says");


    // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        processRandomText(data);
    });
};




//////////////////////////////////////////////////////////////////////////////////////////
// main() - entry point into the LIRI applicaiotn. A switch statement to process either //
//     either of the following commands: 1) concert-this 2)spotify-this-song            //
//     3)movie-this 4) do-what-it says                                                  // 
//////////////////////////////////////////////////////////////////////////////////////////

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

// console.log("Search is: " + search);
// console.log("Term is: " + term);

switch (search) {

    case "concert-this":
        {
            if (term) {
                runConcertThis(term);
            }
            else {
                console.log("No input paramater specified with command concert-this.")
            }
        }
        break;
    case "spotify-this-song":
        {
            if (term) {
                runSpotifyThisSong(term);
            }
            else {
                console.log("No input paramater specified with command spotify-this-song.")
                console.log("Therefore defaulting to The Sign by Ace of Base");
                runSpotifyThisSong("The Sign");
            }
        }
        break;

    case "movie-this":
        {
            if (term)
                runMovieThis(term);
            else
                runMovieThis("Mr. Nobody")
            break;
        }
    case "do-what-it-says":
        {
            runDoWhatItSays();
            break;
        }
    default:
        console.log("Command line error - unrecognized command");
        break;
}





