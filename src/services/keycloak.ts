import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://localhost",
    realm: "load-testing",
    clientId: "simple-user",
});

export default keycloak;