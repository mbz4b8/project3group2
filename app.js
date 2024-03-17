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

// Recently Played Chart
  // Bar chart data
  let barData = [{
    x: recentlyPlayed.rplTrackArtist,
    y: recentlyPlayed.rplTrackPopularity,
    type: 'bar',
    text: recentlyPlayed.rplTrackName
  }];

  // Bar chart layout
  let barLayout = {
    title: 'Spotify Artists Recently Played',
    xaxis: {
      title: 'Artist Name'
    yaxis: {
      title: 'Spotify Track Popularity'
    }
    }
  };

  // Plot the bar chart
  Plotly.newPlot("bar", barData, barLayout);
