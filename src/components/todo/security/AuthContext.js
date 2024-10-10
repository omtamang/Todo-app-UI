import { createContext, useContext, useState } from "react";
import { executeJwtAuthentication } from "../api/AuthenticationApiService"
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext) 

export default function AuthProvider({ children }){

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)


    // function login(username, password){
    //     if(username==='in28minutes' && password === 'dummy'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }
    //     else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    // async function login(username, password){

    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)

    //     try {
    //         const response = await executeBasicAuthentication(baToken)

    //         if(response.status===200){
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and puting headers')
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )

    //             return true
    //         }
    //         else{
    //             Logout()
    //             return false
    //         }
    //     } catch(error){
    //         Logout()
    //         return false
    //     }
    // }

    async function login(username, password){

        try {
            const response = await executeJwtAuthentication(username, password)

            if(response.status===200){

                const jwtToken = 'Bearer ' + response.data.token

                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and puting headers')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true
            }
            else{
                Logout()
                return false
            }
        } catch(error){
            Logout()
            return false
        }
    }

    function Logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, Logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}