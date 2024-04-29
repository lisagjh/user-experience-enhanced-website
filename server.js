// Import the Express.js module
import express, { request, response } from "express";

// Import the fetchJson function from a custom helper file
import fetchJson from "./helpers/fetch-json.js";
import { resolveInclude } from "ejs";

// Set the base API endpoint
const apiUrl = "https://fdnd-agency.directus.app/items";

// Create a new Express app
const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

const storiesData = await fetchJson(apiUrl + "/tm_story");
const playlistsData = await fetchJson(apiUrl + "/tm_playlist");

// ?fields=*.*.* -> stond achter playlistData, als ik dit weg haal werken imgs wel??

// array voor de gelikede playlists
let favs = [];

// array new playlist
let newPlaylist = [];

// route voor homepage
app.get("/", function (request, response) {
  // Haal alle personen uit de WHOIS API op
  fetchJson(apiUrl).then((apiData) => {
    response.render("home", {
      stories: storiesData.data,
      playlists: playlistsData.data,
      favs: favs,
    });
  });
});

// route voor lessons
app.get("/lessons", function (request, response) {
  // Haal alle personen uit de WHOIS API op
  console.log(playlistsData)
  fetchJson(apiUrl).then((apiData) => {
    response.render("lessons", {
      stories: storiesData.data,
      playlists: playlistsData.data,
      favs: favs,
    });
  });
});

// Maak een GET route voor een detailpagina met een request parameter id
app.get("/playlists", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(apiUrl + "/tm_playlist" + request.params.id).then((apiData) => {
    // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
    response.render("playlists", {
      stories: storiesData.data,
      playlists: playlistsData.data,
      favs: favs,
    });
  });
});

// detail pagina playlist

app.get("/playlist/:slug", function (request, response) {
  const url = `${apiUrl}/tm_playlist?filter={"slug":{"_eq":"${request.params.slug}"}}`;

  fetchJson(url).then((playlistData) => {
    response.render("playlist-detail", {
      playlist: playlistData.data,
      stories: storiesData.data,
      favs: favs,
    });
  });
});

//! post voor fav playlists

// POST route for liking or unliking a playlist
app.post("/playlist/:slug/like", (request, response) => {
  const playlistSlug = request.params.slug;
  const playlist = playlistsData.data.find(
    (playlist) => playlist.slug === playlistSlug
  );

  if (playlist) {
    const index = favs.findIndex((item) => item.slug === playlist.slug);
    if (index === -1) {
      favs.push(playlist);
      console.log("Playlist added to favs:", playlist);
    } else {
      favs.splice(index, 1);
      console.log("Playlist removed from favs:", playlist);
    }
  } else {
    console.log("Playlist not found:", playlistSlug);
  }

  if (request.body.enhanced) {
    response.render('partials/fav-playlist', {favs: favs})
  } else {
    response.redirect(303, '/playlists')
  }
});

// Maak een GET route voor een detailpagina met een request parameter id
app.get("/stories", function (request, response) {
  // Gebruik de request parameter id en haal de juiste story uit de API op
  fetchJson(apiUrl + "/stories" + request.params.id).then((apiData) => {
    response.render("stories", {
      stories: storiesData.data,
      playlists: playlistsData.data,
      favs: favs,
    });
  });
});

app.get("/stories/:slug", function (request, response) {
  const url = `${apiUrl}/tm_story?filter={"slug":{"_eq":"${request.params.slug}"}}`;

  fetchJson(url).then((storiesData) => {
    response.render("story-detail", {
      playlist: playlistData.data,
      stories: storiesData.data,
      favs: favs,
    });
  });
})

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`Application started on http://localhost:${PORT}`);
});
