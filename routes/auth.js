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

/**
 * @api {get} /auth Get Google OAuth sign in URL
 * @apiName OAuth Login
 * @apiGroup Auth
 *
 * @apiSuccess {Object} Location Google OAuth Sign in URL
 *
 * @apiSuccessExample successResponse
 *     HTTP/1.1 303 See Other
 *     {
 *       "Location": "OAuth redirect URL"
 *     }
 */
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

/**
 * @api {get} /auth/callback Callback URL for Oauth response
 * @apiName OAuth Callback
 * @apiGroup Auth
 *
 * @apiSuccess {String} Script to send respose to parent/frontend
 *
 * @apiSuccessExample successResponse
 *     HTTP/1.1 200 OK
 *     `<script>window.opener.postMessage({type:'status', loginStatus: true, tokens },"*");
      window.close();</script>`

    @apiSuccessExample errorResponse
 *     HTTP/1.1 200 OK
 *     `<script>window.opener.postMessage({type:'status', loginStatus: false},"*");
      window.close();</script>`
 */
router.get("/callback", async (req, res) => {
  // Callback contains either ?code if succesfully logged in
  // Else it contains ?error
  const code = req.query.code;
  if (code) {
    let oAuthClient = getClient();
    getTokenFromCode(code, oAuthClient)
      .then((token) => {
        // console.log("token", token);
        // If user denies permission
        if (token.scope !== "https://www.googleapis.com/auth/calendar.events")
          throw new Error();
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
