import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

export default function LoginComponent() {
    const [username, setUserName] = useState("in28minutes")
    const [password, setPassword] = useState("")

    const [showErrorMessage, setErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event){
        setUserName(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function handleSubmit(){
        if(await authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        }
        else{
            setErrorMessage(true)
        }
    }

    return (
        
        <div className="login">
            <h1>Time to Login!</h1>
            {showErrorMessage && <div className='errorMessage'>Authentication Failed. Please check your credenials</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" className='btn btn-success w-25 m-4' onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}