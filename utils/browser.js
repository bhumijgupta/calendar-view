require("dotenv").config();

let getMessageFromTemplate = (status, token) => {
  if (status === true)
    return `<script>window.opener.postMessage({type:'status', loginStatus: ${status}, tokens: ${JSON.stringify(
      token
    )}},"${process.env.FRONTEND_URI}");
    window.close();</script>`;
  else
    return `<script>window.opener.postMessage({type:'status', loginStatus: ${status}}, "${process.env.FRONTEND_URI}");
    window.close();</script>`;
};

module.exports = { getMessageFromTemplate };
