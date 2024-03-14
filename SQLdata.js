const express = require('express');
const { Pool } = require('pg');

const app = express();

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'micaz',
  host: 'https://mbz4b8.github.io/project3group2/',
  database: 'Spotify',
  password: 'postgres',
  port: 5432, // Default PostgreSQL port
});

// Define a route to handle database query
app.get('/data', async (req, res) => {
  try {
    // Query the database
    const result = await pool.query('SELECT * FROM your_table');

    // Send the query result as JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
