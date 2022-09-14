const domain = "fzdev.eu.auth0.com";
const clientId = "MkO5fxCBtJmQ4TvLCO7wXfzKhW6XeuJp";
const audience = "https://api.facturazen.es";
//const serverUrl = "https://localhost:8080";
const serverUrl = "https://facturazen-backend-9tcee.ondigitalocean.app";

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience,
    scope: "read:current_user",
  },
  dev: {
    serverUrl,
  },
};

export const address = {
  local: "http://localhost:8080",
  remote: "https://facturazen-backend-9tcee.ondigitalocean.app",
};
