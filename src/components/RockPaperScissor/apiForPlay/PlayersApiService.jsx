import { api } from "./ApiService"

export const retriveAllUsers = () => api.get("/users")

export const retriveByName = (username) => api.get(`/users/${username}`)