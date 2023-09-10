export const NO_DATA = '-';

export const API_URL: string = process.env.REACT_APP_API_URL != null
    ? process.env.REACT_APP_API_URL
    : '';

export const API_TIMEOUT: number = process.env.REACT_APP_API_TIMEOUT != null
    ? +process.env.REACT_APP_API_TIMEOUT
    : 1000;
// END API URLs & SETTINGS

// KEYCLOAK SETTINGS
export const KEYCLOAK_URL: string
    = process.env.REACT_APP_KEYCLOAK_URL != null
    ? process.env.REACT_APP_KEYCLOAK_URL
    : '';

export const KEYCLOAK_REALM: string
    = process.env.REACT_APP_KEYCLOAK_REALM != null
    ? process.env.REACT_APP_KEYCLOAK_REALM
    : '';

export const KEYCLOAK_CLIENT_ID: string
    = process.env.REACT_APP_KEYCLOAK_CLIENT_ID != null
    ? process.env.REACT_APP_KEYCLOAK_CLIENT_ID
    : '';




