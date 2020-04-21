const express = require("express"),
  router = express.Router(),
  {
    getConnectionUrl,
    getTokenFromCode,
    getClient,
  } = require("../utils/google-auth"),
  jwtUtil = require("../utils/jwt"),
  { getMessageFromTemplate } = require("../utils/browser");

// ***************
// ROUTES
// ***************

router.get("/", async (req, res) => {
  let oAuthClient = getClient();
  // Get redirect url
  let url = getConnectionUrl(oAuthClient);
  // Redirect to url for signup
  res.writeHead(303, {
    Location: url,
  });
  res.end();
});

router.get("/callback", async (req, res) => {
  // Callback contains either ?code if succesfully logged in
  // Else it contains ?error
  const code = req.query.code;
  if (code) {
    let oAuthClient = getClient();
    getTokenFromCode(code, oAuthClient)
      .then((token) => {
        console.log("token", token);
        res.send(getMessageFromTemplate(true, jwtUtil.signToken(token)));
        res.end();
      })
      .catch((err) => {
        console.error(err);
        res.send(getMessageFromTemplate(false));
      });
  } else {
    res.send(getMessageFromTemplate(false));
  }
});

module.exports = router;
