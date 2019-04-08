//Adds in any requirements
require('dotenv').config();
const fs = require('fs');
//Constants for any modules
const Spotify = require('node-spotify-api');
const axios = require('axios');
//Takes in the Spotify Key and ID
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };
//Storing the user inputs
let methodOP = ['concert-this','spotify-this-song','movie-this','do-what-it-says'];
let listOP = ['concertThis', 'spotifyThis','movieThis']
let method = process.argv[2];
let selection = process.argv[3];

//API call for Bands in town
let concertthis = function(){
    //for loop merging the results
    for(i = 4; i < process.argv.length; i++){
        selection += `${process.argv[i]}`;
    }
    encodeURIComponent(selection);
    axios.get(`https://rest.bandsintown.com/artists/${selection}/events?app_id=codingbootcamp`).then(function (response) {
        console.log(selection)
        for(i = 0;i < response.data.length; i++){
                console.log('========================================');
                console.log(response.data[i].venue.name);
                console.log(`${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
        };
    });
};
// Song info function using spotify api

//Function that runs the function respective to user input
// for(i = 0;i < methodOP.length; i++ ){
//     if(method == methodOP.includes(method)){
//         eval(`${listOP[i]}`)
//     }
// };    
const spotify = new Spotify({
    id: `247067acfe234c45b52f9fe328d8f40c`,
    secret: `a4729a8abd0a4a278252b9df9e109c6c`,
});

let spotifyThis = function(){
    let savedSong = process.argv[3]
    for(i = 4; i < process.argv.length; i++){
        savedSong += `${process.argv[i]}`;
    }
    spotify
  .search({ type: 'track', query: `outsider` })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
};
let movieThis = function(){
    for(i = 4; i < process.argv.length; i++){
        selection += ` ${process.argv[i]}`;
    }
    if(selection == ''){
        selection = 'Mr nobody'
    }
    encodeURIComponent(selection);
    

    axios.get(`http://www.omdbapi.com/?t=${selection}&apikey=15f01d3`).then(function(response){
        
        
        let mIN = response.data;

        console.log(`_______________________________________________`);
        console.log(mIN.Title);
        console.log(`The movie came out in the year ${mIN.Year}`);
        console.log(`It has a rating of ${mIN.imdbRating}`);
        console.log(`It has a Rotten Tomatoes rating of ${mIN.Ratings[1].Value}`);
        console.log(`The movie was produced in ${mIN.Country}`);
        console.log(`It is availible in the following languages: ${mIN.Language}`);
        console.log(`Plot: ${mIN.Plot}`);
        console.log(`These are the main cast members: ${mIN.Actors}`);
        console.log(`_______________________________________________`);

    });
}
let doThis = function(){
    fs.readFile('random.txt', 'utf8', function(error, data) {

        if (error) {
          return console.log(error);
        }
        const dataList = data.split(',');
        console.log(dataList);
        selection = dataList[1];
        
        switch(dataList[0]){
            case 'concert-this': concertthis();
            break;
        
            case 'spotify-this song': spotifyThis();
            break;
        
            case 'movie-this': movieThis();
            break;
        };
      });
}


//Changing functionality to switch cases
switch(process.argv[2]){
    case 'concert-this': concertthis();
    break;

    case 'spotify-this song': spotifyThis();
    break;

    case 'movie-this': movieThis();
    break;

    case 'do-what-it-says': doThis();
    break;
};