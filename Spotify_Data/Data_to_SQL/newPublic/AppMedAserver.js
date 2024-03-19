const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));

// Define a route handler for the root URL
app.get('/', (req, res) => {
    // Send the index.html file as the response
    res.sendFile(path.join(__dirname, 'AppMedAindex.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
console.log('Starting server...'); // Log when the server starts
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

