const { google } = require("googleapis");

let getEvents = (auth) => {
  const calendar = google.calendar({ version: "v3", auth });
  return calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
};

let addAttendee = (auth, data) => {
  const calendar = google.calendar({ version: "v3", auth });
  return calendar.events.patch({
    calendarId: "primary",
    eventId: data.eventId,
    requestBody: {
      attendees: data.attendees,
      description: data.description,
      summary: data.summary,
    },
    sendUpdates: "all",
  });
};

module.exports = { getEvents, addAttendee };
