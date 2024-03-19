# Project 3 Team 2: Spotify Data & Dashboard Build

This README provides a comprehensive guide on how to pull data from the Spotify API and create a dashboard to visualize the retrieved data. 

## Access Spotify Web Developer API:
- Log in to the Spotify developer dashboard with your Spotify account.
- Create an app and select "Web API" as the type of API to create.
- Once the app is created, obtain the app credentials (Client ID and Client Secret) required for API authorization to obtain an access token.

## Extract Spotify User Data:
- Due to Spotify API's rate limits, multiple Spotify Apps were created to minimimize API calls to allow for all data be pulled for the creation of a Spotify SQLite database. For each of the below Spotify Apps, a html page was developed along with custom javascript to access the Spotify listener data by user profile id and then provide a link to download the data via a json file. Node.js and Express.js were used to faciliate accessing the Spotify API and downloading the data. A list of apps and their corresponding files is below:
  - AppTracks: pulled "Recently Played" and "Top Tracks" data from Spotify API
    - Files located in [newPublic Folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/newPublic) labeled:
      - "AppTracksindex.html", "AppTracksscript.js", "AppTracksserver.js"
      - Final json files downloaded from HTML were copied into [json_downloads folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/json_downloads)
  - AppShortTermArtist: pulled "Top Artists Short Term" data from Spotify API
    - Files located in [newPublic Folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/newPublic) labeled:
      - "AppShortindex.html", "AppShortscript.js", "AppShortserver.js"
      - Final json files downloaded from HTML were copied into [json_downloads folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/json_downloads)
    - AppMediumTermArtist: pulled "Top Artists Medium Term" data from Spotify API
      - Files located in [newPublic Folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/newPublic) labeled:
      - "AppMedAindex.html", "AppMedAscript.js", "AppMedAserver.js"
      - Final json files downloaded from HTML were copied into [json_downloads folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/json_downloads)
    - AppLongTermArtist: pulled "Top Artists Long Term" data from Spotify API
      - Files located in [newPublic Folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/newPublic) labeled:
      - "AppLongAindex.html", "AppLongAscript.js", "AppLongAserver.js"
      - Final json files downloaded from HTML were copied into [json_downloads folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/json_downloads)

## Data Transformation and Storage:
- Run the [Import Spotify API data to SQL](https://github.com/mbz4b8/project3group2/blob/main/Spotify_Data/Data_to_SQL/Import%20Spotify%20API%20data%20to%20SQL.ipynb) file in Jupyter notebook.
  - Import dependencies like Pandas and JSON.
  - Read in the json files downloaded from Spotify API and stored in [json_downloads folder](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/json_downloads)
  - Follow instructions in the Jupyter notebook to transform data into .csv files to load into the SQLite database.
  - Store .csv files in the [SQLite/csv folder.](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/SQLite/csv)
- Run the [SQLite_Database_Creation](https://github.com/mbz4b8/project3group2/blob/main/Spotify_Data/Data_to_SQL/SQLite/SQLite_Database_Creation.ipynb) file in Jupyter notebook to create a "Spotify.db" file containing Spotify API data.
  - Import dependencies of sqlite3, CSV, and JSON.
  - Connect to the SQLite database and create a new table for each[.csv file](https://github.com/mbz4b8/project3group2/tree/main/Spotify_Data/Data_to_SQL/SQLite/csv) created in the previous step.
  - Follow instructions for creating tables and loading data in the Jupyter notebook file.
  - Export Spotify.db's tables and data into a JSON file named [tables_data.json](https://github.com/mbz4b8/project3group2/blob/main/Spotify_Data/Data_to_SQL/SQLite/tables_data.json).
- For reference and defintions of Spotify data in SQLite database and final json file, review the [Spotify API Data Dictionary.](https://github.com/mbz4b8/project3group2/blob/main/Spotify_Data/Data_to_SQL/SQLite/Spotify%20API%20Data%20Dictionary.md)

## Dashboard Creation:
- Copy the "tables_data.json" file into the [root directory](https://github.com/mbz4b8/project3group2/tree/main).
- Create an [app.js file](https://github.com/mbz4b8/project3group2/blob/main/app.js) that reads the [tables_data.json file](https://github.com/mbz4b8/project3group2/blob/main/tables_data.json) and builds code for four different visualization modules of the Spotify dashboard:
  - Songs Recently Played
  - Top Songs Played with a drop-down menu for time frame selection
  - Top Artists with a drop-down menu for time frame selection
  - Top Artists Dropdown allowing users to select a top artist and see related artists
- Create an [index.html file](https://github.com/mbz4b8/project3group2/blob/main/index.html) to render the Spotify dashboard.
  - Include dependencies like Plotly for chart visualizations and Bootstrap for CSS.
  - Include the custom JavaScript file "app.js" in the body of HTML to load the data and visualizations.
- Utilize GitHub pages to host the "index.html" file and render the dashboard.
- Access final dashboard [here.](https://mbz4b8.github.io/project3group2)






