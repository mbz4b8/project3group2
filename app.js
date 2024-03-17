// Fetch data and log to console
fetch(Spotifydata)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

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
