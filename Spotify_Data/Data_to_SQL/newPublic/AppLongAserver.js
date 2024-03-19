const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'newPublic' directory
app.use(express.static(path.join(__dirname, 'newPublic')));

// Define a route handler for the root URL
app.get('/', (req, res) => {
    // Send the index.html file as the response
    res.sendFile(path.join(__dirname, 'AppLongAindex.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

