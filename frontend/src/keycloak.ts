import Keycloak, { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: "http://keycloak-staging.haidelbert.io/auth",
  realm: "master",
  clientId: "haidelbert-frontend",
};
const keycloak = Keycloak(keycloakConfig);

export default keycloak;
