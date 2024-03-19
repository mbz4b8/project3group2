![Project_AI](https://github.com/mbz4b8/Project3-FINAL/assets/91983427/0a897bf7-da44-45c6-af5b-26fa4806de20)



# Overview

For this project, we wanted to remake Spotify Wrapped into an interactive dashboard that users can use to explore their Spotify data.
The data that we used included the user's Top Artists, Top Played Songs, and Related Artists.
Ultimately, our goal was to make the Spotify Wrapped more personalized and suiting our needs as Spotify consumers to see data in real time.
One of the key takeaways here was to make an interface that tells the story we are trying to convey on its own. 


 ## Interaction with the Data

By clicking the link below, you will be guided to one of our member's Spotify Wrapped information, where you will see interactive graphs relating to their most recently played songs, top songs played (by timeframes), top artists (by time frames), and related artists that coincide with their top artists. 
Going into further detail - 
1. Graphs
   - All of the graphs shown are interactive! As a user, we wanted to see what our most recent data shows us.
   - Our first graph ("Songs Recently Played") shows, in real time, what songs were listened to compared to the Spotify Popularity.
   - The second graph created was "Top Songs Played" - we were able to show top songs played by the user over three different time frames using a dropdown:
       1. All Time
       2. Last 6 months
       3. Last 4 Weeks
    - The third graph shows "Top Artists" using the same time frames as the one above.
    - At the bottom, we created a dropdown that takes the user's Top Artists and displays 5 related artists, along with their picture and Spotify page link.
    - Lastly, we made sure to use Spotify's color scheme in our dashboard. The colors the Spotify uses can be found in the link inlcuded under "Ethical Considerations" below.


## Ethical Considerations

While creating this dashboard, we had to keep in mind that we were working with Spotify's data, artists' pictures and information, as well as our user's Spotify profile data.
- For Spotify, we needed to use their logo appropriately. This included size, color, background color of the dashboard so that the logo looked the best, make sure the logo wasn't distorted in any way, etc. The documentation for these guidelines can be found [here](https://developer.spotify.com/documentation/design) 
- We had to make sure that we abided by Spotify's Data Privacy Laws, which includes access to data via an API required consent from the user's profile, so that we could use our javascript code included in the user's authorization to gain permission. Included in this is that the data storage in the database incldued the design to keep user name (PII) separate from listener data in order ot protect user privacy.
- The last piece considered was the artist's intellectual property. Spotify’s business model includes negotiations with artists on how their names, likeness, and music are shared in platform and by apps using Spotify services. Our dashboard was designed to adhere to artist guidelines for song names, artist names, artist images (required to be displayed without alteration, filters or overlays), etc. 


## Data Sources:

    • Spotify: https://developer.spotify.com/documentation/web-api

    • Recently Played Data API Documentation: https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track

    • Related Artists: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists

    • Top Artists and Top Tracks: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

    • ChatGPT: https://chat.openai.com/
   
## Link to Project Dashboard:

https://mbz4b8.github.io/project3group2

