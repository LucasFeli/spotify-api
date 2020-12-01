require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const hbs = require("hbs");
const { connectSpotifyApi, spotifyApi } = require("./spotify");

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(morgan("dev"));

connectSpotifyApi();

hbs.registerPartials(`${__dirname}/views/partials/`);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/artist-search", async (req, res) => {
  const { artist } = req.query;
  try {
    const {
      body: {
        artists: { items },
      },
    } = await spotifyApi.searchArtists(artist);
    res.render("artist-search-results", { artists: items });
  } catch (err) {
    console.error(err);
  }
});

app.get("/albums/:artistId", async (req, res) => {
  const { artistId } = req.params;
  try {
    const {
      body: { items },
    } = await spotifyApi.getArtistAlbums(artistId);
    res.render("albums", { albums: items });
  } catch (err) {
    console.error(err);
  }
});

app.get("/tracks/:albumId", async (req, res) => {
  const { albumId } = req.params;
  try {
    const {
      body: { items: tracks },
    } = await spotifyApi.getAlbumTracks(albumId);
    res.render("tracks", { tracks });
  } catch (err) {
    console.error(err);
  }
});

app.listen(process.env.PORT, () => console.log("server running in port 4000"));
