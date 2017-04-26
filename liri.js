var fs = require('fs');
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('spotify-web-api-node');
var keys = require("./key.js");
var json = require("json");



var firstNum = process.argv[2];
var secondNum = process.argv[3];


function liriCommandRun(run,param){

  switch (run) {
    case "myTweets":

        myTweets();

      break;

      case "spotify-this-song":

        spotifyThis(param)
        break;

      case "movie-this":

          movieThis(param)
        break;

        case "do-what-it-says":

            doWhatItSays();

          break;

          default:console.log(firstNum + " :command undefined");
  }

}




function myTweets(){
           //Passes Twitter keys into the call to Twitter API.
           var client = new Twitter({
             consumer_key: '<E5MrWa15VIFTYtkz3Uz0jieun>',
             consumer_secret: '<uB5Mm0gQzRmAUvP9DWXAmgDVlOA61U4u9ILlUcZ3smaP8qPSzJ>',
             access_token_key: '<3817716088-L4FJipmXpsfV9MHRo9DkfJuAirUNsd5bGRdfOlE>',
             access_token_secret: '<J74W88rdcnI0KJ0JBD56YGr4gdMIL8a81eVESkd3pvoVl>'


           });

           //Search the length of my tweets and it includes the last 20 tweets that I've posted.
           var user = "dewatson21";
           var tweet_count = 20;

           client.get('statuses/user_timeline', {screen_name: user, count: tweet_count} function(error, data, response){
              if (error) {
                  throw error;
              }
              else {
                var data_tweet = [];

                for ( i in tweets ){

                  var data = {

                    "Created"   : tweets[i].created_at,
                    "Tweet"     : tweets[i].text,
                    "Retweeted" : tweets[i].retweet_count,
                    "Favorited" : tweets[i].favorite_count

                  };
                 data_tweet.push(data);

                  }
                  console.log("=================START==============");
                  console.log("Sucessfully Counted" + tweet.length + "Max 20 tweets from Twitter");
                  console.log("=====================================");
                  console.log(json.render(data_tweet, { keysColor : "green", stringColor: "white"}));
                  console.log("================================");
                  console.log("---------------END---------------");
              }
          });

        appendLogFile("Manipulated myTweets")

    }



function spotifyThis(song) {

  var spotifyClient = new spotify();


});

  spotifyClient.searchTracks(song).then(function(response){

      var data_spot = [];
      var tracks = response.body.track.items;

        for (i in tracks ){
            var data = {
                    "Track"       : tracks[i].name,
                    "Album"       : tracks[i].album.name,
                    "Artist(s)"   : tracks[i].artist[0].name,
                    "Preview URL" : tracks[i].preview_url
                  };
            data_spot.push(data);
        }

        var items_total = tracks.length;

          console.log("---------START-------");
          console.log("Sucessfully Counted" + items_total + "items from spotify");
          console.log("=======================");
          console.log(json.render(data_spot, {keysColor : "Green", stringColor: "white"}));
          console.log("========================");
          console.log("------------END--------");

    {,    function(error) {
              console.log(error);
    });

          appendLogFile("Manipulated spotify-this-song with argument" + " ''" + song + " ''");

  }


function movieThis(movie) {

  var query_url = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=long&tomatoes=true&r=json';

  request(query_url, function(error, response, body) {

      if(!error && response.statusCode == 200){


        var data_movie = {

            "Title"                     :JSON.parse(body).Title,
            "Released"                  :JSON.parse(body).Released,
            "Country"                   :JSON.parse(body).Country,
            "Language(s)"               :JSON.parse(body).Language,
            "Actors"                    :JSON.parse(body).Actors,
            "IMDB Rating"               :JSON.parse(body).imdbRating,
            "Rotten Tomatoes Rating"    :JSON.parse(body).tomatoRating,
            "Rotten Tomatoes URL"       :JSON.parse(body).TomatoURL,
            "Plot"                      :JSON.parse(body).Plot
        }

        console.log("------------START---------");
        console.log("Successfully Collected OMDB Results for" + data_movie.Title + ".");
        console.log("=============================");
        console.log(json.render(data_movie,{ keysColor : "Green", stringColor: "white"});
        console.log("---------------END-----------");
      }
      else
        console.log(error);

  });

      appendLogFile("Manipulated movie-this with argument" + "''" + movie + "''");

    }



  function doWhatItSays(){


        fs.readFile("random.txt","utf8", function(error, random_txt){
            var ran_txt = random_txt.split(',');
            var func = ran_txt[0];
            var param = ran_txt[1];

            console.log("PARM: ", param);


            switch (func) {
              case "myTweets":
                  myTweets();
                  break;

              case "spotify-this-song":
                  spotifyThis(param);
              break;

              case "movie-this":
                movieThis(param);
                break;

            }

        });
            appendLogFile("Manipulated do-what-it-says");

  }
