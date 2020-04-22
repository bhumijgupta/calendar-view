$("document").ready(() => {
  // ***************
  // INIT
  // ***************
  let loader = $(".loader-row");
  let cardsRow = $(".cards-row");
  let cardsContainer = $(".cards-container");
  let inviteRow = $(".invite-edit-row");
  let formTitle = $("#invite-title");
  let formDescription = $("#invite-description");
  let formAttendee = $("#invite-attendee");
  let formId = $("#invite-id");
  let formButton = $("#invite-button");
  let formResult = $("#invite-result");
  let eventArr;

  // ***************
  // Functions
  // ***************

  let getEvents = () => {
    loader.show();
    $.get({
      url: "http://localhost:3000/api/getEvents",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
    })
      .fail((xhr, status, err) => {
        if (err === "Unauthorized" || xhr.responseJSON.err.code === 401) {
          sessionStorage.clear();
          window.location.href = window.location.origin;
        }
        sessionStorage.clear();
      })
      .done((data) => {
        eventArr = data.events;
        loader.hide();
        console.log(data);
        showCards(data.events);
        cardsRow.show();
      });
  };

  let showCards = (data) => {
    let allCards = "";
    data.forEach((event) => {
      let altDesc = "No summary present";
      allCards += `<div class="card mt-2 mb-2">
        <div class="card-body">
          <h5 class="card-title">${event.summary}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${
            event.start.date || new Date(event.start.dateTime).toLocaleString()
          } - ${
        event.end.date || new Date(event.end.dateTime).toLocaleString()
      }</h6>
          <p class="card-text">
            ${event.description || altDesc}
          </p>
          <div>
            <button class="btn btn-primary invite-Btn">
              Send Invite
            </button>
          </div>
        </div>
      </div>`;
    });
    cardsContainer.html(allCards);
    document.querySelectorAll(".invite-Btn").forEach((button, idx) => {
      button.addEventListener("click", () => {
        handleInviteClick(data[idx]);
      });
    });
  };

  let handleInviteClick = (data) => {
    cardsRow.hide();
    inviteRow.show();
    formId.val(data.id);
    formTitle.val(data.summary);
    formDescription.val(data.description || "");
  };

  let addInvite = (event) => {
    let attendees = event.attendees;
    if (attendees === undefined) {
      attendees = [];
    }
    $.post({
      url: "http://localhost:3000/api/addAttendee",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      data: {
        eventId: event.id,
        attendees: [...attendees, { email: formAttendee.val() }],
        summary: formTitle.val(),
        description: formDescription.val(),
      },
    })
      .done((data) => {
        formResult.text(`Successfully sent invite to ${formAttendee.val()}`);
      })
      .fail((err) => {
        formResult.text("Something went wront, please try again");
        console.log(err);
      })
      .always(() => {
        setTimeout(() => {
          inviteRow.hide();
          loader.show();
          getEvents();
        }, 2000);
      });
  };

  // ***************
  // START EXECUTE
  // ***************

  cardsRow.hide();
  inviteRow.hide();
  let token = sessionStorage.getItem("token");
  if (token === undefined) {
    window.location.href = window.location.origin;
  } else {
    getEvents();
  }

  $("form").on("submit", (e) => {
    e.preventDefault();
    formButton.attr("disabled", true);
    // console.log(eventArr);
    let currEvent = eventArr.filter((event) => event.id === formId.val());
    console.log(currEvent);
    addInvite(currEvent[0]);
  });
});
