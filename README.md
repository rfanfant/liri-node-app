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









