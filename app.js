// Read in the Spotify SQLite data from tables_json.json file
const Spotifydata = 'tables_data.json';

// Fetch data and log to console
d3.json(Spotifydata)
  .then(function(data) {
    console.log(data);
  });
    
