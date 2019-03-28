# liri-node-app
Language Interpretation and Recognition Interface


ABOUT
-----
In this assignment I am a CLI which processes commands and parameters. The commands retreives data using the Axios package to interface with external  node API(s), the first being Spotify, OMDB and Moment.

The four commands that the liri.js application takes in are:
1) concert-this <"artist name">
2) spotify-this-song <"song">
3) movie-this <"movie">
4) do-what-it-says

Input Commands
--------------
1) concert-this <"artist name">

The command concert-this takes in an artist name (e.g. "node liri.js concert-this Amos Lee") and renders the folloing information about each of the upcoming events for this artist: a) Name of the venue b) Venue location c) Date of the Event(MM/DD/YYYY)

2) spotify-this-song <"song">

The command spotify-this-song takes in a name of a song (e.g. node liri.js spotify-this-song One in A Million) and returns the following inofrmaiton about the song: a) Artist(s) b) the song's name c) a mp3 preview link of the song from Spotify d) The album that the song is from
e) if no song is provided then the application will default to "The Sign" by Ace of Base.


3) movie-this <"movie-name">

This command will output the following information about the movie. Output includes
a) Title of the movie b) Year the movie came out c) ImDB Rating of the movie d) Rotten Tomatoes rating of the movie e) Country where the movie was produced f) Language of the movie g) Plot of hte movie h)Actors in the movie.  If the user doesn't type in a movie name, the program will output data for the movie "Mr. Nobody"

4) do-what-it-says

This commands uses the 'fs' Node package to read the text of the file called Random.txt and executes the command stored in it.


LIRI
----
The application main entry point reads the CLI process.argv arguments and uses a switch statment to process the commands. If the command is "concert-this" the function runConcertThis(inputParam) is called. If the command is "spotify-this-song" the command is runSpotifyThisSong(inputParam). If the command is movie-this the command runMovieThis(inputParam) is called.

The input parameters (inputParam) in remaining process.arv string is passed to the appropriate run command to execute the command. 

IMPORTANT
---------

Due to the fact that secret keys are needed to used several files need to be created in order to protect your secret keys. 

FIRST: A .gitignore was created in order to tell github not to upload the .env file which contains the secret Spotify user/password keys. The following changes are required if  you would like to properly make this application work/run in your environmet.

SECOND: head to https://developer.spotify.com/dashboard/ and create and account to obtain your own ID and SECRET key. 

THIRD:  Create a file named .env . In the .env file include the following 
.....
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
....


FOURTH: This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.


END IMPORTANT:
--------------

FYI
---

Please review the following documentation concerning the Node libraries used for additional information about how the application works
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)











