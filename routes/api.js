const express = require("express"),
  router = express.Router(),
  { getEvents } = require("../services/calendar"),
  { isAuthenticated } = require("../middleware"),
  { getClient } = require("../utils/google-auth"),
  { decodeToken } = require("../utils/jwt");

router.get("/getEvents", isAuthenticated, (req, res) => {
  let jwt = req.headers.authorization.split(" ")[1];
  let tokens = JSON.parse(decodeToken(jwt));
  let oAuthClient = getClient();
  oAuthClient.setCredentials({
    access_token: tokens.access_token,
    token_type: tokens.token_type,
  });
  getEvents(oAuthClient)
    .then((eventList) => {
      res.json({
        events: eventList.data.items,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

module.exports = router;
