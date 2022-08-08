const domain = "fzdev.eu.auth0.com";
const clientId = "MkO5fxCBtJmQ4TvLCO7wXfzKhW6XeuJp";
const audience = "https://api.facturazen.es";
const serverUrl = "https://localhost:8080";

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience,
  },
  dev: {
    serverUrl,
  },
};

export const address = {
  local: "https://localhost:8080",
  remote: "https://fancy-dodos-ring-213-94-15-90.loca.lt",
};
