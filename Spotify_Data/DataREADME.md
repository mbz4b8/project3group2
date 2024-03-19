# Project 3 Team 2: Spotify Data & Dashboard Build

This README provides a comprehensive guide on how to pull data from the Spotify API and create a dashboard to visualize the retrieved data. 

## Access Spotify Web Developer API:
- Log in to the Spotify developer dashboard with your Spotify account.
- Create an app and select "Web API" as the type of API to create.
- Once the app is created, obtain the app credentials (Client ID and Client Secret) required for API authorization to obtain an access token.

## Extract Spotify User Data:
- Utilize files in the "newPublic" folder, which includes:
  - Recently Played tracks and artist data via the "AppTracks" files.
  - Top Artists data by Short Term, Long Term, and Medium Term time frames.
  - Top Tracks data by Short Term, Long Term, and Medium Term time frames.
  - Utilize Node.js and Express.js to handle authentication and proxy requests to the Spotify API.

## Data Transformation and Storage:
- Run the "Import Spotify API data to SQL" file in Jupyter notebook.
- Import dependencies like Pandas and JSON.
- Follow instructions in the Jupyter notebook to transform data into .csv files to load into the SQLite database.
- Store .csv files in the "SQLite/csv" folder.
- Run the "SQLite_Database_Creation" file in Jupyter notebook to create a "Spotify.db" file containing Spotify API data.
- Import dependencies of sqlite3, CSV, and JSON.
- Connect to the SQLite database and create a new table for each .csv file created in the previous step.
- Follow instructions for creating tables and loading data in the Jupyter notebook file.
- Export Spotify.db, tables, and data into a JSON file named "tables_data.json".

## Dashboard Creation:
- Copy the "tables_data.json" file into the root directory.
- Create an "app.js" file that reads the "tables_data.json" file and builds code for four different visualization modules of the Spotify dashboard:
- Songs Recently Played
- Top Songs Played with a drop-down menu for time frame selection
- Top Artists with a drop-down menu for time frame selection
- Top Artists Dropdown allowing users to select a top artist and see related artists
- Create an "index.html" file to render the Spotify dashboard.
- Include dependencies like Plotly for chart visualizations and Bootstrap for CSS.
- Include the custom JavaScript file "app.js" in the body of HTML to load the data and visualizations.






