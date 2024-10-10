import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}) {
    const [username, setUsername] = useState("Cypher")

    const [isAuthenticated, setAuthenticated] = useState(false)

    function login(username, password){
        if(username=="Cypher" && password=="dummy"){
            setAuthenticated(true)
            return true
        }
        else {
            setAuthenticated(false)
            return false
        }
    }

    function Logout(){
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={ { username, isAuthenticated, Logout, login } }>
            { children }
        </AuthContext.Provider>
    )
}