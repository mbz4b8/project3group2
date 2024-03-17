// Read in the Spotify SQLite data from tables_json.json file
//const Spotifydata = 'tables_data.json';

// Read in the Spotify SQLite data from tables_json.json file
const Spotifydata = 'tables_data.json';

// Fetch data and process it
fetch(Spotifydata)
  .then(response => response.json())
  .then(data => {
    // Assuming combinedRelatedArtists data is in data.combinedRelatedArtists
    const combinedRelatedArtists = data.combinedRelatedArtists;

    // Extracting data for the four charts
    const xValues1 = combinedRelatedArtists.map(entry => entry.tArtistsname);
    const yValues1 = combinedRelatedArtists.map(entry => entry.tArtistspopularity);
    const xValues2 = combinedRelatedArtists.map(entry => entry.tGenre);
    const yValues2 = combinedRelatedArtists.map(entry => entry.tArtistspopularity);
    const xValues3 = combinedRelatedArtists.map(entry => entry.tArtistsname);
    const yValues3 = combinedRelatedArtists.map(entry => entry.tArtistsFollowers);
    const xValues4 = combinedRelatedArtists.map(entry => entry.tArtistsname);
    const yValues4 = combinedRelatedArtists.map(entry => entry.tArtistspopularity);

    // Bar chart layout 1
    const barLayout1 = {
      title: 'Artist Popularity',
      xaxis: {
        title: 'Artist Name'
      },
      yaxis: {
        title: 'Popularity'
      }
    };

    // Bar chart layout 2
    const barLayout2 = {
      title: 'Artist Genre',
      xaxis: {
        title: 'Genre'
      },
      yaxis: {
        title: 'Popularity'
      }
    };

    // Bar chart layout 3
    const barLayout3 = {
      title: 'Artist Followers',
      xaxis: {
        title: 'Artist Name'
      },
      yaxis: {
        title: 'Followers'
      }
    };

    // Bar chart layout 4
    const barLayout4 = {
      title: 'Artist Popularity vs. Followers',
      xaxis: {
        title: 'Artist Name'
      },
      yaxis: {
        title: 'Popularity'
      }
    };

    // Plot the first bar chart
    Plotly.newPlot("chart1", [{
      x: xValues1,
      y: yValues1,
      type: 'bar',
      text: yValues1.map(String)
    }], barLayout1);

    // Plot the second bar chart
    Plotly.newPlot("chart2", [{
      x: xValues2,
      y: yValues2,
      type: 'bar',
      text: yValues2.map(String)
    }], barLayout2);

    // Plot the third bar chart
    Plotly.newPlot("chart3", [{
      x: xValues3,
      y: yValues3,
      type: 'bar',
      text: yValues3.map(String)
    }], barLayout3);

    // Plot the fourth bar chart
    Plotly.newPlot("chart4", [{
      x: xValues4,
      y: yValues4,
      type: 'bar',
      text: yValues4.map(String)
    }], barLayout4);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
