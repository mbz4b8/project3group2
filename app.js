// Read in the Spotify SQLite data from tables_json.json file
const Spotifydata = 'tables_data.json';

// Fetch data and log to console
fetch(Spotifydata)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
