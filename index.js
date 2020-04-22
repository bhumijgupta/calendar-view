console.log("active");
window.addEventListener("message", (message) => {
  if (message.data.type === "status") {
    if (message.data.loginStatus) {
      sessionStorage.setItem("token", message.data.tokens);
      window.location.href = window.location.href + "events";
    }
  }
});
