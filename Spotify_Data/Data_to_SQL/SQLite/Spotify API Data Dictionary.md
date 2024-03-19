### combinedTopArtists Table
| Field                  | Definition   
| -----------------------| ---------------------------------------------------------------------------------------------------------------------------
| username               | name of user from which spotify data is collected
| tTrackImages            | Blank, ignore this
| tArtistimage1_height| image height of large Artist image size
| tArtistimage1_url| image url of large Artist image size
| tArtistimage1_width| image width of large Artist image size
| tArtistimage2_height| image height of medium Artist image size
| tArtistimage2_url| image url of medium Artist image size
| tArtistimage2_width| image width of medium Artist image size
| tArtistimage3_height| image height of small Artist image size
| tArtistimage3_url| image url of small Artist image size
| tArtistimage3_width| image width of small Artist image size
| tArtistsexternalurls| URL to go to Artist page within Spotify
| tArtistsid| Spotify id for Artist
| tArtistsname| Artist Name
| tArtistsFollowers| Number of followers for Artist on Spotify
| tGenre| Genre of Artist
| tArtistspopularity| The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.
| tArtiststype| Type of record (Artist, track, playlist, etc)
| tArtistsuri| Spotify uri for Artist
| tArtistsTime| Short to indicate top artist in last 4 weeks. Medium to indicate topartist in last 6 months. Long to indicate top artist for all time.

### combinedTopTracks Table
| Field                  | Definition   
| -----------------------| ---------------------------------------------------------------------------------------------------------------------------
| tTrackImages| Blank, ignore this
| tTrackimage1_height| image height of large Track image size
| tTrackimage1_url| image url of large Track image size
| tTrackimage1_width| image width of large Track image size
| tTrackimage2_height| image height of medium Track image size
| tTrackimage2_url| image url of medium Track image size
| tTrackimage2_width| image width of medium Track image size
| tTrackimage3_height| image height of small Track image size
| tTrackimage3_url| image url of small Track image size
| tTrackimage3_width| image width of small Track image size
| tTrackArtist| Track Artist Name
| tTrackExternalurls| URL to go to Track page in Spotify
| tTrackName| Name of Track
"| tTrackPopularity| The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note: the popularity value may lag actual popularity by a few days: the value is not updated in real time."
| tTrackURI| Track Name
| tTrackTime| Short to indicate top track in last 4 weeks. Medium to indicate top track in last 6 months. Long to indicate top track for all time
| username| name of user from which spotify data is collected
