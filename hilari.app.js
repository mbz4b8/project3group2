// Define the URL for fetching Spotify SQLite data
const spotifyDataUrl = 'https://raw.githubusercontent.com/mbz4b8/project3group2/main/tables_data.json';

// Define the globally accessible array to store unique top artists
let uniqueTopArtists = [];
let relateArtistArray = [];

// Function to fetch data and process it
async function fetchDataAndProcess(callback) {
    try {
        // Fetch data from the Spotify data URL
        const response = await fetch(spotifyDataUrl);
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

// Call the function to fetch data and process it
fetchDataAndProcess(updateHtmlContent);

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
}

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
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card", "mb-3");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = item.RelatedArtist;

      const cardLink = document.createElement("a");
      cardLink.href = item.Link;
      cardLink.target = "_blank";
      cardLink.classList.add("card-link");
      cardLink.textContent = "Spotify Page";

      const cardImg = document.createElement("img");
      cardImg.src = item.Image;
      cardImg.alt = item.RelatedArtist;
      cardImg.classList.add("card-img-top");

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardLink);
      cardContainer.appendChild(cardImg);
      cardContainer.appendChild(cardBody);

      filteredDataDiv.appendChild(cardContainer);
  });
}

