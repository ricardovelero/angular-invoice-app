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
