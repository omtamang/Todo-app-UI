import {  useParams , Link} from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'

export default function WelcomeComponent() {

    const {username} = useParams()
    const [message, setMessage] = useState(null)

    const authContext = useAuth()

    function callHelloWorldAPI(){
        console.log("called")

        retrieveHelloWorldBean(authContext.token)
        .then( (response) => { successfulResponse(response) } )
        .catch( (error) => errorResponse(error) )
        .finally(console.log("cleanup"))

        retrieveHelloWorldPathVariable("Ranga", authContext.token)
        .then((res) => successfulResponsePath(res))
        .catch((err) => errorResponse(err))
    }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function successfulResponsePath(res) {
        console.log(res)
        console.log(res)
    }

    function errorResponse(error) {
        console.log(error)
    }
    
    return (
        <div className="welcome">
            <h1>Welcome {username}</h1>
            <div>
                Your todos. <Link to="/todos">Manage</Link>
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callHelloWorldAPI}>Call Hello world rest AuthProvider</button>
            </div>

            <div className='text-info'>
                {message}
            </div>

            <div className='text-info'>
                {message}
            </div>

        </div>
    )
}