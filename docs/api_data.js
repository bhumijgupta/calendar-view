define({ "api": [
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
          "title": "authorisationExample:",
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
            "description": "<p>Upcoming events in array format.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
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
            "description": "<p>error fetching calendar events.</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorised",
            "description": "<p>user not authenticated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "fetchingError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": errorMessage\n}",
          "type": "json"
        },
        {
          "title": "Unauthorised:",
          "content": "HTTP/1.1 401 Unauthorised\n{\n   \"error\": \"Unauthorised\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "APIs"
  }
] });
