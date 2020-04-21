// Can be further extended to include token and other details
let getMessageFromTemplate = (status, token) => {
  if (status === true)
    return `<script>window.opener.postMessage({type:'status', loginStatus: ${status}, tokens: ${JSON.stringify(
      token
    )}},"http://localhost:5000");
    window.close();</script>`;
  else
    return `<script>window.opener.postMessage({type:'status', loginStatus: ${status}},"http://localhost:5000");
    window.close();</script>`;
};

module.exports = { getMessageFromTemplate };
