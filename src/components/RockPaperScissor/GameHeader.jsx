import {Link} from 'react-router-dom'
import { useAuth } from './Security/GameAuth'
import { retriveByName } from './apiForPlay/PlayersApiService'

export default function GameHeader() {
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function Logout(){
        authContext.Logout()
    }

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">Om TMA</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/game">Game</Link>}</li>
                            <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/players">Players</Link>}</li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">{!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}</li>
                        <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/login " onClick={Logout}>Logout</Link>}</li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    )
}