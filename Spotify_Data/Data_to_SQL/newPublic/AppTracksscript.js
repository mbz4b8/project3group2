// Define topArtistsArray and relatedArtistsWithId as global variables
let recentPlayArray =[];
let allTopTracksArray = [];

// Constants
const CLIENT_ID = '33c94953ce8141abbc3fa37a19a2c5dc';
const REDIRECT_URI = 'http://192.168.86.131:8080'; // This should be set up in your Spotify Developer Dashboard
const SCOPES = [
    'user-top-read',
    'user-read-recently-played',
    'user-follow-read',
    'user-library-read',
    'user-read-playback-state',
]; // Add more scopes as needed

// Function to handle authentication
function authenticateSpotify() {
    // Redirect the user to Spotify authorization page
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const redirectUri = encodeURIComponent(REDIRECT_URI);
    const scopes = encodeURIComponent(SCOPES.join(' '));

    window.location = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
}

// Function to handle fetching user profile data
function getUserProfileData(accessToken) {
    // Make a GET request to the Spotify API endpoint for user profile
    fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Extract the display_name property from the response data
        const displayName = data.display_name;

        // Create an object with only the displayName property
        const profileData = { displayName };

        // Convert the profile data object to a JSON string
        const jsonString = JSON.stringify(profileData);
        
        // Save the JSON string to local storage with the correct key
        localStorage.setItem('userProfileData', jsonString);

        // Save the display name separately if needed
        localStorage.setItem('displayName', displayName);

        console.log(profileData);
    })
    .catch(error => console.error('Error fetching user profile:', error));
}


// Function to download user data as a JSON file
function downloadUserData() {
    // Retrieve the JSON string from localStorage
    var storedData = localStorage.getItem('userProfileData');

    // Check if there's any data stored
    if (storedData) {
        // Convert the JSON string to a Blob object
        var blob = new Blob([storedData], { type: 'application/json' });
        
        // Create a temporary URL for the Blob
        var url = URL.createObjectURL(blob);
        
        // Create a link element
        var link = document.createElement('a');
        link.href = url;
        link.download = 'userProfileDataTracksApp.json'; // Set the file name with .json extension
        
        // Trigger the click event programmatically
        link.click();
        
        // Clean up
        URL.revokeObjectURL(url);
    } else {
        console.log('No user data found in localStorage');
    }
}

// Add an event listener to a link element to trigger the download function on click
document.getElementById('downloadusernameLink').addEventListener('click', function(event) {
    // Prevent the default action of the link
    event.preventDefault();
    
    // Call the function to download user data
    downloadUserData();
});

// Function to handle extracting access token from URL hash
function getAccessTokenFromUrlHash() {
    const hashParams = window.location.hash.substr(1).split('&').reduce(function (acc, item) {
        const parts = item.split('=');
        acc[parts[0]] = decodeURIComponent(parts[1]);
        return acc;
    }, {});

    return hashParams.access_token;
}

// Check if there's an access token in the URL hash
const accessToken = getAccessTokenFromUrlHash();

if (accessToken) {
    // If access token is present, fetch user profile data
    getUserProfileData(accessToken);
    getUserTopTracksMedium(accessToken);
    getUserTopTracksShort(accessToken);
    getUserTopTracksLong(accessToken);
    getRecentPlay(accessToken);
} else {
    // If access token is not present, initiate authentication flow
    authenticateSpotify();
}



let topTracksArrayMedium = []; // Define topTracksArrayShort globally or within a scope where it's accessible

// Function to handle fetching Top Tracks data
function getUserTopTracksMedium(accessToken) {
     // Make a GET request to the Spotify API endpoint for user profile
        fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    .then(response => response.json())
    .then(data => {

        // Extract desired properties from each item in the items array
        const topTracksArrayMediumTemp = data.items.map(item => {
            let imageProperties = [];
               
            // Extract properties for each image
            if (item.album.images.length > 0) { // Check if there are images
                item.album.images.forEach(image => {
                    imageProperties.push({
                        height: image.height,
                        url: image.url,
                        width: image.width
                    });
                });
            }
               
            // Construct an object for each track only if imageProperties is not empty
            if (imageProperties.length > 0) {
                let trackObject = {
                    tTrackImages: []
                };
               
                // Push individual image properties into the trackObject
                imageProperties.forEach((image, index) => {
                    trackObject[`tTrackimage${index + 1}_height`] = image.height;
                    trackObject[`tTrackimage${index + 1}_url`] = image.url;
                    trackObject[`tTracktimage${index + 1}_width`] = image.width;
                });
               
                // Add other track properties
                trackObject.tTrackexternalurls = item.external_urls.spotify;
                trackObject.tTrackPopularity = item.popularity;    
                trackObject.tTrackArtist = item.artists.map(artist => artist.name).join(', ');
                trackObject.tTrackname = item.name;
                trackObject.tTrackuri = item.uri;
                trackObject.tTrackTime = 'medium_term'; // Include the time range here
                return trackObject;
            }
        });


        // Assign the array to the global variable
        topTracksArrayMedium = topTracksArrayMediumTemp;

        // Convert the array to a JSON string
        var jsonString = JSON.stringify(topTracksArrayMedium);

        // You can save the JSON string to local storage
        localStorage.setItem('topTracksArrayMedium', jsonString);

        console.log('topTracksArrayMedium', topTracksArrayMedium);
    })
    .catch(error => console.error(`Error fetching user top tracks medium:`, error));
}

                
// Function to download user Top Tracks Medium data as a JSON file
function downloadTopTracksMedium() {

// Retrieve the JSON string from localStorage
var storedData = localStorage.getItem('topTracksArrayMedium');

// Check if there's any data stored
if (storedData) {
// Convert the JSON string to a Blob object
var blob = new Blob([storedData], { type: 'application/json' });

// Create a temporary URL for the Blob
var url = URL.createObjectURL(blob);

// Create a link element
var link = document.createElement('a');
link.href = url;
link.download = 'topTracksArrayMedium.json'; // Set the file name with .json extension

// Trigger the click event programmatically
link.click();

// Clean up
URL.revokeObjectURL(url);
} else {
console.log('No user track medium data found in localStorage');
}}


// Add an event listener to a link element to trigger the download function on click
document.getElementById('downloadttamedLink').addEventListener('click', function(event) {
// Prevent the default action of the link
event.preventDefault();

// Call the function to download user playlists data
downloadTopTracksMedium();
});




let topTracksArrayShort = []; // Define topTracksArrayShort globally or within a scope where it's accessible

// Function to handle fetching Top Tracks Short Term data
function getUserTopTracksShort(accessToken) {
    // Make a GET request to the Spotify API endpoint for user profile
    fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {

       // Extract desired properties from each item in the items array
       const topTracksArrayShortTemp = data.items.map(item => {
        let imageProperties = [];
           
        // Extract properties for each image
        if (item.album.images.length > 0) { // Check if there are images
            item.album.images.forEach(image => {
                imageProperties.push({
                    height: image.height,
                    url: image.url,
                    width: image.width
                });
            });
        }
           
        // Construct an object for each track only if imageProperties is not empty
        if (imageProperties.length > 0) {
            let trackObject = {
                tTrackImages: []
            };
           
            // Push individual image properties into the trackObject
            imageProperties.forEach((image, index) => {
                trackObject[`tTrackimage${index + 1}_height`] = image.height;
                trackObject[`tTrackimage${index + 1}_url`] = image.url;
                trackObject[`tTracktimage${index + 1}_width`] = image.width;
            });
           
            // Add other track properties
            trackObject.tTrackexternalurls = item.external_urls.spotify;
            trackObject.tTrackPopularity = item.popularity;    
            trackObject.tTrackArtist = item.artists.map(artist => artist.name).join(', ');
            trackObject.tTrackname = item.name;
            trackObject.tTrackuri = item.uri;
            trackObject.tTrackTime = 'short_term'; // Include the time range here
            return trackObject;
        }
    });
       
       // Assign the array to the global variable
       topTracksArrayShort = topTracksArrayShortTemp;

       // Convert the array to a JSON string
       var jsonString = JSON.stringify(topTracksArrayShort);

       // You can save the JSON string to local storage
       localStorage.setItem('topTracksArrayShort', jsonString);

       console.log('topTracksArrayShort', topTracksArrayShort);
         
})
        .catch(error => console.error(`Error fetching user top tracks long:`, error));
}
                
// Function to download user Top Tracks Short data as a JSON file
function downloadTopTracksShort() {

    // Retrieve the JSON string from localStorage
    var storedData = localStorage.getItem('topTracksArrayShort');

    // Check if there's any data stored
    if (storedData) {
        // Convert the JSON string to a Blob object
        var blob = new Blob([storedData], { type: 'application/json' });

        // Create a temporary URL for the Blob
        var url = URL.createObjectURL(blob);

        // Create a link element
        var link = document.createElement('a');
        link.href = url;
        link.download = 'topTracksArrayShort.json'; // Set the file name with .json extension

        // Trigger the click event programmatically
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
    } else {
        console.log('No user track long data found in localStorage');
        }
}

// Add an event listener to a link element to trigger the download function on click
document.getElementById('downloadttashLink').addEventListener('click', function(event) {
    // Prevent the default action of the link
    event.preventDefault();

    // Call the function to download user playlists data
    downloadTopTracksShort();
});








let topTracksArrayLong = []; // Define topTracksArrayLong globally or within a scope where it's accessible

// Function to handle fetching Top Tracks Long Term data
function getUserTopTracksLong(accessToken) {
    // Make a GET request to the Spotify API endpoint for user profile
    fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {

       // Extract desired properties from each item in the items array
       const topTracksArrayLongTemp = data.items.map(item => {
        let imageProperties = [];
           
        // Extract properties for each image
        if (item.album.images.length > 0) { // Check if there are images
            item.album.images.forEach(image => {
                imageProperties.push({
                    height: image.height,
                    url: image.url,
                    width: image.width
                });
            });
        }
           
        // Construct an object for each track only if imageProperties is not empty
        if (imageProperties.length > 0) {
            let trackObject = {
                tTrackImages: []
            };
           
            // Push individual image properties into the trackObject
            imageProperties.forEach((image, index) => {
                trackObject[`tTrackimage${index + 1}_height`] = image.height;
                trackObject[`tTrackimage${index + 1}_url`] = image.url;
                trackObject[`tTracktimage${index + 1}_width`] = image.width;
            });
           
            // Add other track properties
            trackObject.tTrackexternalurls = item.external_urls.spotify;
            trackObject.tTrackPopularity = item.popularity;    
            trackObject.tTrackArtist = item.artists.map(artist => artist.name).join(', ');
            trackObject.tTrackname = item.name;
            trackObject.tTrackuri = item.uri;
            trackObject.tTrackTime = 'long_term'; // Include the time range here
            return trackObject;
        }
    });

    // Assign the array to the global variable
    topTracksArrayLong = topTracksArrayLongTemp;

    // Convert the array to a JSON string
    var jsonString = JSON.stringify(topTracksArrayLong);

    // You can save the JSON string to local storage
    localStorage.setItem('topTracksArrayLong', jsonString);

    console.log('topTracksArrayLong', topTracksArrayLong);
      
})
     .catch(error => console.error(`Error fetching user top tracks long:`, error));
}
                         
// Function to download user Top Tracks Long data as a JSON file
function downloadTopTracksLong() {

    // Retrieve the JSON string from localStorage
    var storedData = localStorage.getItem('topTracksArrayLong');

    // Check if there's any data stored
    if (storedData) {
        // Convert the JSON string to a Blob object
        var blob = new Blob([storedData], { type: 'application/json' });

        // Create a temporary URL for the Blob
        var url = URL.createObjectURL(blob);

        // Create a link element
        var link = document.createElement('a');
        link.href = url;
        link.download = 'topTracksArrayLong.json'; // Set the file name with .json extension

        // Trigger the click event programmatically
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
    } else {
        console.log('No user track long data found in localStorage');
    }
}

// Add an event listener to a link element to trigger the download function on click
document.getElementById('downloadttalongLink').addEventListener('click', function(event) {
    // Prevent the default action of the link
    event.preventDefault();
    
    // Call the function to download user playlists data
    downloadTopTracksLong();
});

   

let recentlyPlayed = []; // Define recentlyPlayed globally or within a scope where it's accessible

// Function to handle fetching Recently Played data
function getRecentPlay(accessToken) {
    // Make a GET request to the Spotify API endpoint for user profile
    fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        // Extract desired properties from each item in the items array
        const recentlyPlayedTemp = data.items.map(item => {
            let imageProperties = [];
           
        // Extract properties for each image
        if (item.track.album.images.length > 0) { // Check if there are images
            item.track.album.images.forEach(image => {
                imageProperties.push({
                    height: image.height,
                    url: image.url,
                    width: image.width
                });
            });
        }
           
        // Construct an object for each track only if imageProperties is not empty
        if (imageProperties.length > 0) {
            let trackObject = {
                tTrackImages: []
            };
           
            // Push individual image properties into the trackObject
                imageProperties.forEach((image, index) => {
                trackObject[`tTrackimage${index + 1}_height`] = image.height;
                trackObject[`tTrackimage${index + 1}_url`] = image.url;
                trackObject[`tTracktimage${index + 1}_width`] = image.width;
            });
                // Add other track properties
                trackObject.rplTrackArtist = item.track.artists.map(artist => artist.name).join(', ');
                trackObject.rplTrackExternalurls = item.track.external_urls.spotify;  
                trackObject.rplTrackName = item.track.name;
                trackObject.rplTrackPopularity = item.track.popularity;
                trackObject.rplTrackURI = item.track.uri; 
                return trackObject;
            }; 
                
        });

          // Assign the array to the global variable
          recentlyPlayed = recentlyPlayedTemp;

        // Convert the array to a JSON string
        var jsonString = JSON.stringify(recentlyPlayed);

        // You can save the JSON string to local storage
        localStorage.setItem('recentlyPlayed', jsonString);

        console.log('recentlyPlayed', recentlyPlayed);
    })
    .catch(error => console.error(`Error fetching user recently played:`, error));
}

// Function to download user playlists data as a JSON file
function downloadRecentPlay() {
    // Retrieve the JSON string from localStorage
    var storedData = localStorage.getItem('recentlyPlayed');

    // Check if there's any data stored
    if (storedData) {
        // Convert the JSON string to a Blob object
        var blob = new Blob([storedData], { type: 'application/json' });

        // Create a temporary URL for the Blob
        var url = URL.createObjectURL(blob);

        // Create a link element
        var link = document.createElement('a');
        link.href = url;
        link.download = 'recentlyPlayed.json'; // Set the file name with .json extension

        // Trigger the click event programmatically
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
    } else {
        console.log('No recently played data found in localStorage');
    }
}

// Add an event listener to a link element to trigger the download function on click
document.getElementById('downloadrplLink').addEventListener('click', function(event) {
    // Prevent the default action of the link
    event.preventDefault();
    
    // Call the function to download user playlists data
    downloadRecentPlay();
});