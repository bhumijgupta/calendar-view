const { google } = require("googleapis");

let getEvents = (auth) => {
  const calendar = google.calendar({ version: "v3", auth });
  return calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
  });
};

module.exports = { getEvents };
