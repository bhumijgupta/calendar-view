const express = require("express"),
  router = express.Router(),
  { getEvents, addAttendee } = require("../services/calendar"),
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
 * @apiHeaderExample {json} authExample
 *     {
 *        "Authorization" : "Bearer <JSON Web Token>"
 *     }
 *
 * @apiSuccess {Object} events Upcoming events in array format
 *
 * @apiSuccessExample successResponse
 *     HTTP/1.1 200 OK
 *     {
 *       "events": [event,...]
 *     }
 *
 * @apiError (500 Internal Server Error) fetchingError Error fetching calendar events
 *
 * @apiErrorExample fetchingError
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": errorMessage
 *     }
 *
 * @apiError Unauthorised User not authenticated
 *
 * @apiErrorExample Unauthorised
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
      // console.error(err);
      res.status(500).json({ err });
    });
});

/**
 * @api {post} /api/addAttendee Add attendee and send invite to event
 * @apiName AddAttendee
 * @apiGroup APIs
 *
 * @apiHeader {string} authorization Authorization token
 *
 * @apiHeaderExample {json} authExample
 *     {
 *        "Authorization" : "Bearer <JSON Web Token>"
 *     }
 *
 * @apiParam (required) {String} eventId Event ID of the calendar event
 *
 * @apiParam (required) {Object[]} attendees Full list of attendees email id
 *
 * @apiParam (required) {String} summary Title of the event
 *
 * @apiParam (required) {String} description Description of the event
 *
 * @apiParamExample {json} Request-Example
 *    {
 *      "eventId": "1id733hdkdojss937",
 *      "attendees": [{"email": "bhumijgupta@gmail.com"}, {"email": "john.doe@gmail.com"}],
 *      "summary": "Summary of the event",
 *      "description" : "Description of the event",
 *    }
 *
 * @apiSuccess {Object} events Upcoming events in array format
 *
 * @apiSuccessExample successResponse
 *     HTTP/1.1 200 OK
 *     {
 *       "event": <modified event>
 *     }
 *
 * @apiError (500 Internal Server Error) fetchingError Error fetching calendar events
 *
 * @apiErrorExample fetchingError
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": errorMessage
 *     }
 *
 * @apiError Unauthorised User not authenticated
 *
 * @apiErrorExample Unauthorised
 *     HTTP/1.1 401 Unauthorised
 *     {
 *        "error": "Unauthorised"
 *     }
 * @apiError badRequest Required data not present
 *
 * @apiErrorExample badRequest
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "error": "eventId, attendees, summary, description not present"
 *     }
 */
router.post("/addAttendee", isAuthenticated, (req, res) => {
  // Check for required params
  if (
    req.body.eventId === undefined ||
    req.body.attendees == undefined ||
    req.body.summary === undefined ||
    req.body.description === undefined
  ) {
    // if not present, return 400 - malformed request
    res.status(400).json({
      error: "eventId, attendees, summary, description not present",
    });
  } else {
    // Get token
    let jwt = req.headers.authorization.split(" ")[1];
    let tokens = JSON.parse(decodeToken(jwt));
    // Setup auth client
    let oAuthClient = getClient();
    oAuthClient.setCredentials({
      access_token: tokens.access_token,
      token_type: tokens.token_type,
    });
    // Add attendee
    addAttendee(oAuthClient, req.body)
      .then((data) => {
        res.json(data.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
});

module.exports = router;
