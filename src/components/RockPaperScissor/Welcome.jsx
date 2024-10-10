import { Link, useParams } from "react-router-dom"

export default function Weclome() {

    const {name} = useParams()

    return (
        <div className="container mt-5">
            <h1>Welcome {name}</h1>
            <div className="mt-5">
                <Link to="/game" className="btn btn-success">Play Game</Link>
            </div>
        </div>
    )
}