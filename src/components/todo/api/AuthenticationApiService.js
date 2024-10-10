import { apiClient } from "./ApiClient";

export const executeBasicAuthentication 
    = () => apiClient.get('/basic-auth'
)

export const executeJwtAuthentication = (username, password) =>
    apiClient.post(`/authenticate`, {username, password})