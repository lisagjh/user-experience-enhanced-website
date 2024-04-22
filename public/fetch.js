
// POST route for liking a playlist
app.post("/playlist/:slug/like", function (request, response) {
  // Extract the playlist ID from the request parameters
  const playlistSlug = request.params.slug;

  // Check if the playlist ID exists
  const playlist = playlistsData.data.find(
    (playlist) => playlist.slug === playlistSlug
  );

  // If the playlist is found, add it to the favs array
  if (playlist) {
    // Check if the playlist is already in the favs array
    if (!favs.some((item) => item.slug === playlist.slug)) {
      // Add the playlist to the favs array
      favs.push(playlist);
      console.log("Playlist added to favs:", playlist);
    } else {
      console.log("Playlist is already in favs:", playlist);
    }
  } else {
    console.log("Playlist not found with slug:", playlistSlug);
  }

  // Redirect back to the home page after liking the playlist
  response.redirect(303, "/");
});


