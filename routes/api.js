const express = require("express"),
  router = express.Router(),
  { getEvents } = require("../services/calendar"),
  { isAuthenticated } = require("../middleware"),
  { getClient } = require("../utils/google-auth"),
  { decodeToken } = require("../utils/jwt");

// ***************
// ROUTES
// ***************

/**
 * @api {get} /api/getEvents Get upcoming calendar events
 * @apiName GetEvents
 * @apiGroup APIs
 *
 * @apiHeader {string} authorization Authorization token
 *
 * @apiHeaderExample {json} authorisationExample:
 *     {
 *        "Authorization" : "Bearer <JSON Web Token>"
 *     }
 *
 * @apiSuccess {Object} events Upcoming events in array format.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "events": [event,...]
 *     }
 *
 * @apiError (500 Internal Server Error) fetchingError error fetching calendar events.
 *
 * @apiErrorExample fetchingError:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": errorMessage
 *     }
 *
 * @apiError Unauthorised user not authenticated.
 *
 * @apiErrorExample Unauthorised:
 *     HTTP/1.1 401 Unauthorised
 *     {
 *        "error": "Unauthorised"
 *     }
 */
router.get("/getEvents", isAuthenticated, (req, res) => {
  // Get token
  let jwt = req.headers.authorization.split(" ")[1];
  let tokens = JSON.parse(decodeToken(jwt));
  // Setup auth client
  let oAuthClient = getClient();
  oAuthClient.setCredentials({
    access_token: tokens.access_token,
    token_type: tokens.token_type,
  });
  // Get events from calendar
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
