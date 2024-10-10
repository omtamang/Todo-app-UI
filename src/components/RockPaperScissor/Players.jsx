import { useEffect, useState } from "react"
import { retriveAllUsers } from "./apiForPlay/PlayersApiService"

export default function Players() {
    const [users, setUsers] = useState([])

    useEffect(
        () => refreshUsers(), []
    )

    function refreshUsers() {
        retriveAllUsers()
        .then(response => {
            setUsers(response.data)
        })
        .catch(error => console.log(error))
    }
    return (
        <div className="container">
            <div>
                <table className="table table-border">
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Wins</th>
                            <th>Loses</th>
                            <th>Draws</th>
                            <th>Total Games</th>
                        </tr>
                    </thead>
                    {
                        users.map(
                            user => (
                                <tr key={user.id} className="table-info">
                                    <td>{user.userName}</td>
                                    <td>{user.wins.toString()}</td>
                                    <td>{user.loses.toString()}</td>
                                    <td>{user.draws.toString()}</td>
                                    <td>{user.total_games_played.toString()}</td>
                                </tr>
                            )
                        )
                    }
                </table>
            </div>
        </div>
    )
}