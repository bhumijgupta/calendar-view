define({ "api": [
  {
    "type": "post",
    "url": "/api/addAttendee",
    "title": "Add attendee and send invite to event",
    "name": "AddAttendee",
    "group": "APIs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authExample",
          "content": "{\n   \"Authorization\" : \"Bearer <JSON Web Token>\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "required": [
          {
            "group": "required",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>Event ID of the calendar event</p>"
          },
          {
            "group": "required",
            "type": "Object[]",
            "optional": false,
            "field": "attendees",
            "description": "<p>Full list of attendees email id</p>"
          },
          {
            "group": "required",
            "type": "String",
            "optional": false,
            "field": "summary",
            "description": "<p>Title of the event</p>"
          },
          {
            "group": "required",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n  \"eventId\": \"1id733hdkdojss937\",\n  \"attendees\": [{\"email\": \"bhumijgupta@gmail.com\"}, {\"email\": \"john.doe@gmail.com\"}],\n  \"summary\": \"Summary of the event\",\n  \"description\" : \"Description of the event\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "events",
            "description": "<p>Upcoming events in array format</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "successResponse",
          "content": "HTTP/1.1 200 OK\n{\n  \"event\": <modified event>\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "fetchingError",
            "description": "<p>Error fetching calendar events</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorised",
            "description": "<p>User not authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "badRequest",
            "description": "<p>Required data not present</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "fetchingError",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": errorMessage\n}",
          "type": "json"
        },
        {
          "title": "Unauthorised",
          "content": "HTTP/1.1 401 Unauthorised\n{\n   \"error\": \"Unauthorised\"\n}",
          "type": "json"
        },
        {
          "title": "badRequest",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"eventId, attendees, summary, description not present\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "APIs"
  },
  {
    "type": "get",
    "url": "/api/getEvents",
    "title": "Get upcoming calendar events",
    "name": "GetEvents",
    "group": "APIs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authExample",
          "content": "{\n   \"Authorization\" : \"Bearer <JSON Web Token>\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "events",
            "description": "<p>Upcoming events in array format</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "successResponse",
          "content": "HTTP/1.1 200 OK\n{\n  \"events\": [event,...]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "fetchingError",
            "description": "<p>Error fetching calendar events</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorised",
            "description": "<p>User not authenticated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "fetchingError",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": errorMessage\n}",
          "type": "json"
        },
        {
          "title": "Unauthorised",
          "content": "HTTP/1.1 401 Unauthorised\n{\n   \"error\": \"Unauthorised\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "APIs"
  },
  {
    "type": "get",
    "url": "/auth/callback",
    "title": "Callback URL for Oauth response",
    "name": "OAuth_Callback",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Script",
            "description": "<p>to send respose to parent/frontend</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "successResponse",
          "content": "HTTP/1.1 200 OK\n`<script>window.opener.postMessage({type:'status', loginStatus: true, tokens },\"*\");\n  window.close();</script>`",
          "type": "json"
        },
        {
          "title": "errorResponse",
          "content": "HTTP/1.1 200 OK\n`<script>window.opener.postMessage({type:'status', loginStatus: false},\"*\");\n  window.close();</script>`",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth",
    "title": "Get Google OAuth sign in URL",
    "name": "OAuth_Login",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Location",
            "description": "<p>Google OAuth Sign in URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "successResponse",
          "content": "HTTP/1.1 303 See Other\n{\n  \"Location\": \"OAuth redirect URL\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth"
  }
] });
