// Read in the Spotify SQLite data from tables_json.json file
const Spotifydata = 'tables_data.json';

// Import data directly
const data = require('./tables_data.json');

// Assuming recentlyPlayed data is in data.recentlyPlayed
const recentlyPlayed = data.recentlyPlayed;

// Bar chart data
let barData = [{
  x: recentlyPlayed.map(entry => entry.rplTrackArtist),
  y: recentlyPlayed.map(entry => entry.rplTrackPopularity),
  type: 'bar',
  text: recentlyPlayed.map(entry => entry.rplTrackName)
}];

// Bar chart layout
let barLayout = {
  title: 'Spotify Artists Recently Played',
  xaxis: {
    title: 'Artist Name'
  },
  yaxis: {
    title: 'Spotify Track Popularity'
  }
};

// Plot the bar chart
Plotly.newPlot("bar", barData, barLayout);
