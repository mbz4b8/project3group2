// Read in the Spotify SQLite data from tables_json.json file
const Spotifydata = 'tables_data.json';

// Fetch data and process it
fetch(Spotifydata)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Assuming combinedTopTracks data is in data.combinedTopTracks
    const combinedTopTracks = data.combinedTopTracks;
    const recentlyPlayed = data.recentlyPlayed;
    const combinedTopArtists = data.combinedTopArtists;

    // Extracting data for the combined Top Tracks chart
    const xValuestT = combinedTopTracks.map(entry => entry.tTrackname);
    const yValuestT = combinedTopTracks.map(entry => entry.tTrackPopularity);
    const timeFrameT = combinedTopTracks.map(entry => entry.tTrackTime);
    const tTrackArtist = combinedTopTracks.map(entry => entry.tTrackArtist);
    const xValuesrpl = recentlyPlayed.map(entry => entry.rplTrackName);
    const yValuesrpl = recentlyPlayed.map(entry => entry.rplTrackPopularity);
    const rplArtists = recentlyPlayed.map(entry => entry.rplTrackArtist);
    const xValuestA = combinedTopArtists.map(entry => entry.tArtistsname);
    const yValuestA = combinedTopArtists.map(entry => entry.tArtistspopularity);
    const timeFrameA = combinedTopArtists.map(entry => entry.tArtistsTime);
    const tGenre = combinedTopArtists.map(entry => entry.tGenre);

    // Bar chart layout 1
    const barLayout1 = {
      title: 'Songs Recently Played',
      xaxis: {
        title: 'Song Name'
      },
      yaxis: {
        title: 'Spotify Popularity'
      },
      plot_bgcolor: '#191414', // Set plot background color
      paper_bgcolor: '#191414', // Set paper background color
      font: {
        color: 'white' // Set font color to white
      }
    };

    // Bar chart layout
    const barLayout = {
      title: 'Top Songs Played',
      yaxis: {
        title: 'Spotify Popularity'
      },
      plot_bgcolor: '#191414', // Set plot background color
      paper_bgcolor: '#191414', // Set paper background color
      font: {
        color: 'white' // Set font color to white
      }
    };

    // Bar chart layout 3
    const barLayout3 = {
      title: 'Top Artists',
      xaxis: {
        title: 'Artist Name'
      },
      yaxis: {
        title: 'Spotify Popularity'
      },
      plot_bgcolor: '#191414', // Set plot background color
      paper_bgcolor: '#191414', // Set paper background color
      font: {
        color: 'white' // Set font color to white
      }
    };

    // Plot the Recently Played chart
    Plotly.newPlot("chart1", [{
      x: xValuesrpl,
      y: yValuesrpl,
      type: 'bar',
      text: rplArtists,
      marker: {
        color: 'rgb(30, 215, 96)' // Green color for Spotify bars
      }
    }], barLayout1);

    // Define the mapping of original values to  Top Songs Time Frame display labels
const timeFrameTLabels = {
  'long_term': 'All Time',
  'medium_term': 'Last 6 months',
  'short_term' : "Last 4 weeks"
  // Add more mappings as needed
};

    // Populate dropdown with timeFrameT for Top Songs options
const timeFrameDropdown = document.getElementById('timeFrameT');
const uniqueTimeFrames = [...new Set(timeFrameT)]; // Get unique timeFrameT values
uniqueTimeFrames.forEach(timeFrame => {
  const option = document.createElement('option');
  option.value = timeFrame; // Use original value as option value
  option.text = timeFrameTLabels[timeFrame] || timeFrame; // Use label from mapping if available, otherwise use original value
  timeFrameDropdown.add(option);
});

    // Add event listener to Top Songs dropdown
    timeFrameDropdown.addEventListener('change', function() {
      const selectedTimeFrame = timeFrameDropdown.value;
      const filteredData = combinedTopTracks.filter(entry => entry.tTrackTime === selectedTimeFrame);
      const filteredXValues = filteredData.map(entry => entry.tTrackname);
      const filteredYValues = filteredData.map(entry => entry.tTrackPopularity);

      // Update the Top Songs chart with filtered data
      const newData = [{
        x: filteredXValues,
        y: filteredYValues,
        type: 'bar',
        marker: {
          color: 'rgb(30, 215, 96)' // Green color for Spotify bars
        }
      }];
      Plotly.newPlot(topSongs, newData, barLayout);
    });

    // Define the mapping of original values to  Top Artists Time Frame display labels
const timeFrameALabels = {
  'Long_term': 'All Time',
  'medium_term': 'Last 6 months',
  'Short_term' : "Last 4 weeks"
  // Add more mappings as needed
};

    // Populate dropdown with timeFrameT for Top Songs options
const timeFrameADropdown = document.getElementById('timeFrameA');
const uniqueTimeFramesA = [...new Set(timeFrameA)]; // Get unique timeFrameA values
uniqueTimeFramesA.forEach(timeFrame => {
  const option = document.createElement('option');
  option.value = timeFrame; // Use original value as option value
  option.text = timeFrameALabels[timeFrame] || timeFrame; // Use label from mapping if available, otherwise use original value
  timeFrameADropdown.add(option);
});

    // Add event listener to Top Artists dropdown
    timeFrameADropdown.addEventListener('change', function() {
      const selectedTimeFrameA = timeFrameADropdown.value;
      const filteredDataA = combinedTopArtists.filter(entry => entry.tArtistsTime === selectedTimeFrameA);
      const filteredXValuesA = filteredDataA.map(entry => entry.tArtistsname);
      const filteredYValuesA = filteredDataA.map(entry => entry.tArtistspopularity);

      // Update the Top Artists chart with filtered data
      const newDataA = [{
        x: filteredXValuesA,
        y: filteredYValuesA,
        type: 'bar',
        marker: {
          color: 'rgb(30, 215, 96)' // Green color for Spotify bars
        }
      }];
      Plotly.newPlot(topArtists, newDataA, barLayout3);
    });

    // Populate charts with first value from dropdown menus
    const firstTimeFrameT = uniqueTimeFrames[0];
    const firstTimeFrameA = uniqueTimeFramesA[0];

    // Trigger change event for Top Songs dropdown with first value
    timeFrameDropdown.value = firstTimeFrameT;
    timeFrameDropdown.dispatchEvent(new Event('change'));

    // Trigger change event for Top Artists dropdown with first value
    timeFrameADropdown.value = firstTimeFrameA;
    timeFrameADropdown.dispatchEvent(new Event('change'));
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


// Define the globally accessible array to store unique top artists
let uniqueTopArtists = [];
let relateArtistArray = [];

// Function to fetch data and process it
async function fetchDataAndProcess(callback) {
    try {
        // Fetch data from the Spotify data URL
        const response = await fetch(Spotifydata);
        const data = await response.json();
        
        // Extract top artist names from the fetched data
        const relatedArtists = data.combinedRelatedArtists;
        const topArtists = relatedArtists.map(item => item.topArtistName);
        
        // Append top artist and related artist to an array
        relatedArtists.forEach(item => {
          // Extract fields from the JSON data and populate them into an object
          let dataObject = {
              TopArtist: item.topArtistName,
              RelatedArtist: item.tArtistsname,
              Link: item.tArtistsexternalurls,
              Image: item.tArtistimage3_url,
              // Add more columns as needed, mapping to corresponding fields from JSON data
          };
      
          // Push the object into the array
          relateArtistArray.push(dataObject);
      });

        // Append unique top artists to the globally defined array
        topArtists.forEach(artist => {
            if (!uniqueTopArtists.includes(artist)) {
                uniqueTopArtists.push(artist);
            }
        });

        // Log the unique top artists to the console
        console.log(uniqueTopArtists);
        console.log(relateArtistArray);

        // Call the callback function if provided
        if (callback && typeof callback === 'function') {
            callback(data); // Pass the data to the callback function
        }

    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error fetching data:', error);
    }
}

// Function to update HTML content
function updateHtmlContent(data) { // Receive the data as a parameter
    // Reference the dropdown select element
    const dropdown = document.getElementById("topArtist");

    // Populate dropdown with options
    uniqueTopArtists.forEach(artist => {
        const option = document.createElement("option");
        option.textContent = artist;
        dropdown.appendChild(option);
    });

    // Trigger the change event for the dropdown to populate charts with the first value
    dropdown.dispatchEvent(new Event('change'));
}

// Call the function to fetch data and process it
fetchDataAndProcess(updateHtmlContent);

// Reference the dropdown select element
const dropdown = document.getElementById("topArtist");

// Attach an event listener to detect changes in the selected item
dropdown.addEventListener("change", function() {
    // Get the selected artist from the dropdown
    const selectedArtist = dropdown.value;

    // Call a function to filter the Spotify data based on the selected artist
    filterSpotifyData(selectedArtist);
});

// Function to filter Spotify data based on the selected artist
function filterSpotifyData(artist) {
  // Filter the data based on the selected artist
  const filteredData = relateArtistArray.filter(item => item.TopArtist === artist);

  // Use a Set to store unique records based on RelatedArtist
  const uniqueFilteredData = Array.from(new Set(filteredData.map(item => item.RelatedArtist)))
      .map(relArtist => {
          return filteredData.find(item => item.RelatedArtist === relArtist);
      });

  // Reference the div where filtered data will be displayed
  const filteredDataDiv = document.getElementById("filteredData");

  // Clear previous content
  filteredDataDiv.innerHTML = "";

  // Display filtered data using Bootstrap cards
  uniqueFilteredData.forEach(item => {
    // Create a div to contain the row of cards
    const cardRow = document.createElement("div");
    cardRow.classList.add("row", "justify-content-center"); // Add Bootstrap classes for row and center alignment

    // Create a div for each card with margin
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "mb-3", "mx-4", "my-4"); // Add Bootstrap classes for card and margin

    // Create card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Create card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = item.RelatedArtist;

    // Create card link
    const cardLink = document.createElement("a");
    cardLink.href = item.Link;
    cardLink.target = "_blank";
    cardLink.classList.add("card-link");
    cardLink.textContent = "Artist Page";

    // Create card image for the artist
    const cardImg = document.createElement("img");
    cardImg.src = item.Image;
    cardImg.alt = item.RelatedArtist;
    cardImg.classList.add("card-img-top");
    cardImg.style.borderRadius = "0"; // Remove rounded corners

    // Create card image for the Spotify logo
    const logoImg = document.createElement("img");
    logoImg.src = "Spotify_Logo_RGB_Green.png"; // Specify the path to your Spotify logo
    logoImg.alt = "Spotify Logo";
    logoImg.classList.add("spotify-logo-img"); // Add a custom class for styling
    logoImg.style.width = "90px"; // Set the width to 70px
    logoImg.style.height = "auto"; // Let the height adjust automatically while maintaining aspect ratio
    logoImg.style.marginBottom = "10px"; // Add more margin space between Spotify logo and artist image

    // Create a container for both the artist image and the Spotify logo
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("d-flex", "flex-column", "align-items-center"); // Add Bootstrap classes for flexbox layout
    imageContainer.appendChild(logoImg);
    imageContainer.appendChild(cardImg);
    imageContainer.style.marginTop = "10px"; // Set margin-top between the top of the card and the top of the Spotify logo

    // Append elements to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardLink);

    // Append image container and body to card container
    cardContainer.appendChild(imageContainer);
    cardContainer.appendChild(cardBody);

    // Append card container to card row
    cardRow.appendChild(cardContainer);

    // Append card row to the container div where cards will be displayed
    filteredDataDiv.appendChild(cardRow);
})
}
