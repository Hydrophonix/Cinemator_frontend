// Network
export const API_URL = process.env.API_URL || 'http://localhost:4000';
export const GRAPHQL_URL = `${API_URL}/graphql`;
export const TOKEN_URL = `${API_URL}/auth/refresh_token`;

// Local
export const APP_NAME = process.env.APP_NAME || 'Awesome web app';
