// Define topArtistsArray and relatedArtistsWithId as global variables
let topArtistsArray = [];
let relatedArtistsWithId = [];

// Constants
const CLIENT_ID = '51097c69c6d74454a91817d222abf15d';
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

        getUserTopArtistsLong(accessToken);

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
        link.download = 'userProfileDataLongArtists.json'; // Set the file name with .json extension
        
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
} else {
    // If access token is not present, initiate authentication flow
    authenticateSpotify();
}


let topArtistsArrayLong = [];
let relatedArtistsArrayLong = []; // Define a global array to store related artists

// Function to fetch related artists for a given artist
async function fetchRelatedArtistsLong(artistId, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data.artists.slice(0, 5); // Return only the top 5 related artists
}

async function appendRelatedArtistsLong(accessToken, artistsArrayLong) {
    for (const artist of artistsArrayLong) {
        const relatedArtistsLong = await fetchRelatedArtistsLong(artist.tArtistsid, accessToken);

        // For each related artist, fetch detailed artist information
        const detailedRelatedArtistsLong = await Promise.all(relatedArtistsLong.map(async (relatedArtist) => {
            const response = await fetch(`https://api.spotify.com/v1/artists/${relatedArtist.id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();

            // Construct the object with the desired properties
            let detailedRelatedArtist = {
                tTrackImages: [], // Assuming this property is part of the artist object
                tArtistsexternalurls: data.external_urls.spotify,
                tArtistsFollowers: data.followers.total,
                tArtistsid: data.id,
                tArtistsname: data.name,
                tArtistspopularity: data.popularity,
                tArtiststype: data.type,
                tArtistsuri: data.uri,
                tGenre: data.genres.join(', '), // Assuming genres is part of the artist object
                tArtistsTime: 'Long_term', // Including the time range
                topArtistName: artist.tArtistsname // Add the top artist's name
            };

            // Push individual image properties into the detailedRelatedArtist
            if (data.images.length > 0) {
                data.images.forEach((image, index) => {
                    detailedRelatedArtist[`tArtistimage${index + 1}_height`] = image.height;
                    detailedRelatedArtist[`tArtistimage${index + 1}_url`] = image.url;
                    detailedRelatedArtist[`tArtistimage${index + 1}_width`] = image.width;
                });
            }
            
            return detailedRelatedArtist;
        }));

        // Append detailed related artists to the global array
        relatedArtistsArrayLong.push({ relatedArtistsLong: detailedRelatedArtistsLong });
    }
}

// Function to download relatedArtistsArrayLong as a JSON file
function downloadRelatedArtistsLong() {
    // Convert the array to a JSON string
    var jsonString = JSON.stringify(relatedArtistsArrayLong);
    
    // Create a Blob object
    var blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a temporary URL for the Blob
    var url = URL.createObjectURL(blob);
    
    // Create a link element
    var link = document.createElement('a');
    link.href = url;
    link.download = 'relatedArtistsLong.json'; // Set the file name with .json extension
    
    // Trigger the click event programmatically
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
}

// Add an event listener to a link element to trigger the download function on click
document.getElementById('downloadRelatedArtistsLongLink').addEventListener('click', function(event) {
    // Prevent the default action of the link
    event.preventDefault();
    
    // Call the function to download related artists data
    downloadRelatedArtistsLong();
});

// Function to handle fetching Top Artist Long data
function getUserTopArtistsLong(accessToken) {
    // Make a GET request to the Spotify API endpoint for user profile
    fetch('https://api.spotify.com/v1/me/top/artists?time_range=Long_term', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Extract desired properties from each item in the items array
        const topArtistsLongTemp = data.items.map(item => {
            let imageProperties = [];
               
            // Extract properties for each image
            if (item.images.length > 0) { // Check if there are images
                item.images.forEach(image => {
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
                    trackObject[`tArtistimage${index + 1}_height`] = image.height;
                    trackObject[`tArtistimage${index + 1}_url`] = image.url;
                    trackObject[`tArtistimage${index + 1}_width`] = image.width;
                });
               
                // Add other track properties
                trackObject.tArtistsexternalurls = item.external_urls.spotify;
                trackObject.tArtistsFollowers = item.followers.total;    
                trackObject.tArtistsid = item.id;
                trackObject.tArtistsname = item.name;
                trackObject.tArtistspopularity = item.popularity;
                trackObject.tArtiststype = item.type;
                trackObject.tArtistsuri = item.uri;
                trackObject.tGenre = item.genres.join(', ');
                trackObject.tArtistsTime = 'Long_term';
                return trackObject;
            }
        });

        // Assign the array to the global variable
        topArtistsArrayLong = topArtistsLongTemp;

        console.log('Ready to download topArtistsArrayLong', topArtistsArrayLong);

        // Convert the array to a JSON string and save to local storage
        var jsonString = JSON.stringify(topArtistsArrayLong);
        localStorage.setItem('topArtistsArrayLong', jsonString);

        // Fetch and append related artists for TopArtistsArrayLong
        appendRelatedArtistsLong(accessToken, topArtistsArrayLong)
            .then(() => {
                console.log('Ready to download Related Artists for topArtistsArrayLong:', relatedArtistsArrayLong);
            })
            .catch(error => {
                console.error('Error fetching related artists:', error);
            });
    })
    .catch(error => console.error(`Error fetching user top artists Long:`, error));
}

// Function to download user Top Artists Long data as a JSON file
function downloadTopArtistsLong() {
    // Retrieve the JSON string from localStorage
    var storedData = localStorage.getItem('topArtistsArrayLong');

    // Check if there's any data stored
    if (storedData) {
        // Convert the JSON string to a Blob object
        var blob = new Blob([storedData], { type: 'application/json' });

        // Create a temporary URL for the Blob
        var url = URL.createObjectURL(blob);

        // Create a link element
        var link = document.createElement('a');
        link.href = url;
        link.download = 'topArtistsLong.json'; // Set the file name with .json extension

        // Trigger the click event programmatically
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
    } else {
        console.log('No user track Long data found in localStorage');
    }
}

// Add an event listener to a link element to trigger the download function on click
document.getElementById('downloadArtistsLongLink').addEventListener('click', function(event) {
    // Prevent the default action of the link
    event.preventDefault();

    // Call the function to download user playlists data
    downloadTopArtistsLong();
});
