import { apiClient } from "./ApiClient"

export const retrieveTodoPathVariable = (username) => apiClient.get(`/users/${username}/todos`)

export const deleteTodoApi = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)

export const retriveTodoApi = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoApi = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

export const addTodoApi = (username, todo) => apiClient.post(`/users/${username}/todos`, todo)