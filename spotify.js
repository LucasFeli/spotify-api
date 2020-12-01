const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

async function connectSpotifyApi() {
  try {
    const { body } = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(body.access_token);
  } catch (err) {
    console.error(err);
  }
}

const spotifyExports = { connectSpotifyApi, spotifyApi };
module.exports = spotifyExports;
