export const NO_DATA = '-';

export const API_URL: string = process.env.REACT_APP_API_URL ?? 'http://localhost:8081/app-web/v1/';

export const API_TIMEOUT: number = process.env.REACT_APP_API_TIMEOUT != null
    ? +process.env.REACT_APP_API_TIMEOUT
    : 1000;
// END API URLs & SETTINGS

// KEYCLOAK SETTINGS
export const KEYCLOAK_URL: string
    = process.env.REACT_APP_KEYCLOAK_URL ?? '';

export const KEYCLOAK_REALM: string
    = process.env.REACT_APP_KEYCLOAK_REALM ?? '';

export const KEYCLOAK_CLIENT_ID: string
    = process.env.REACT_APP_KEYCLOAK_CLIENT_ID ?? '';

export const HTTP_METHOD_GET: string = 'GET';
export const HTTP_METHOD_HEAD: string = 'HEAD';
export const HTTP_METHOD_POST: string = 'POST';
export const HTTP_METHOD_PUT: string = 'PUT';
export const HTTP_METHOD_PATCH: string = 'PATCH';
export const HTTP_METHOD_DELETE: string = 'DELETE';
export const HTTP_METHOD_OPTIONS: string = 'OPTIONS';
export const HTTP_METHOD_TRACE: string = 'TRACE';


