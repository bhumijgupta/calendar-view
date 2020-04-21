require("dotenv").config();
const { google } = require("googleapis");

const scope = ["https://www.googleapis.com/auth/calendar.events.readonly"];

let getClient = () => {
  return new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT
  );
};

// returns the redirect url for google login
let getConnectionUrl = (auth) => {
  return auth.generateAuthUrl({
    access_type: "online",
    prompt: "consent",
    scope,
  });
};

// gets token from callback code
let getTokenFromCode = (code, auth) => {
  return new Promise((resolve, reject) => {
    auth.getToken(code).then(({ tokens }) => {
      resolve(tokens);
    });
  });
};

module.exports = { getConnectionUrl, getTokenFromCode, getClient };
