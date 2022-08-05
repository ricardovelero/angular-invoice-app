const domain = "fzdev.eu.auth0.com";
const clientId = "MkO5fxCBtJmQ4TvLCO7wXfzKhW6XeuJp";

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
  },
};

export const address = {
  local: "https://localhost:8080",
  remote: "https://fancy-dodos-ring-213-94-15-90.loca.lt",
};
