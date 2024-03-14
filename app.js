//read in the Spotify SQLite data from tables_json.json file
const Spotifydata = 'tablesz_json.json";

//Fetch data and log to console
d3.json(Spotifydata)
  .then(function(data) {
    console.log(data);
    
