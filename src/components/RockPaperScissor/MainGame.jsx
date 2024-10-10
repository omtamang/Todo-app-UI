import { useEffect, useState } from "react"
import { retriveByName } from "./apiForPlay/PlayersApiService"
import { useAuth } from "./Security/GameAuth"

export default function MainGame() {

    let [random, setRandom] = useState(null)
    const [win, setWin] = useState(null)
    const [lose, setLose] = useState(null)
    const [draw, setDraw] = useState(false)

    const [countWin, setCountWin] = useState(0)
    const [countLose, setCountLose] = useState(0)
    const [countDraw, setCountDraw] = useState(0)

    const [rock, setRock] = useState(true)
    const [paper, setPaper] = useState(true)
    const [scissors, setScissors] = useState(true)

    const [users, setUser] = useState([])
    const authContext = useAuth()

    useEffect (
        () => userHistory(), []
    )

    function userHistory(){
        retriveByName(authContext.username)
        .then(response=>{
            setUser(response.data)
        })
    }

    function computer(user) {
        const ran = Math.floor(Math.random() * 3)
        const opt = ['Rock', 'Paper', 'Scissors']
        setRandom(opt[ran])

        if(user=='Rock'){
            setRock(true)
            setPaper(false)
            setScissors(false)
        }
        else if (user=='Paper'){
            setRock(false)
            setPaper(true)
            setScissors(false)
        }
        else{
            setRock(false)
            setPaper(false)
            setScissors(true)
        }

        console.log(ran)
        if (user=='Rock' && ran==0 || user=='Paper' && ran==1 || user=='Scissors' && ran==2){
            setCountDraw(countDraw + 1)
            setDraw(true)
            setWin(false)
            setLose(false)
        }
        else if (user=='Rock' && ran==1 || user=='Scissors' && ran==0 || user=='Paper' && ran==2){
            setCountLose(countLose + 1)
            setDraw(false)
            setLose(true)
            setWin(false)
        }
        else if(user=='Rock' && ran==2 || user=='Paper' && ran==0 || user=='Scissors' && ran==1){
            setCountWin(countWin + 1)
            setWin(true)
            setDraw(false)
            setLose(false)
        }

        setInterval( 
            () => {
                setRock(true)
                setPaper(true)
                setScissors(true)
            }, 3000
        )
    }

    return (
        <div className="container">
            <h1 className="text-secondary">ROCK PAPER SCISSORS</h1>
            
            <div className="d-flex flex-row justify-content-around mt-1">
                <div>
                    <h3 className="mt-5">Player</h3>
                    <div className="d-flex flex-row justify-content-between">
                        {rock && <div className="p-4" onClick={() => computer('Rock')}>
                            <img src="https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296854_960_720.png" className="pe-auto" style={{
                                width: "150px", height:"150px"
                            }} alt="Rock"/>
                        </div>}

                        {paper && <div className="p-4" onClick={() => computer('Paper')}>
                            <img src="https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296855_1280.png" className="pe-none" style={{
                                    width: "150px", height:"150px"
                                }} alt="Paper"/>
                        </div>}

                        {scissors && <div className="p-4" onClick={() => computer('Scissors')}>
                            <img src="https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296853_960_720.png" className="pe-auto" style={{
                                    width: "150px", height:"150px"
                                }} alt="Scissors"/>
                        </div>}
                    </div>
                </div>

                {/* Showing Computer moves */}
                <div className="mt-5">
                    <h3>Computer</h3>
                    <div className="mt-2">
                        
                        <div className="d-flex flex-row justify-content-between">
                            {random=='Rock' && <div>
                                <img src="https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296854_960_720.png" className="pe-auto" style={{
                                    width: "150px", height:"150px"
                                }} alt="Rock"/>
                            </div>}

                            {random=='Paper' && <div>
                                <img src="https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296855_1280.png" className="pe-none" style={{
                                        width: "150px", height:"150px"
                                    }} alt="Paper"/>
                            </div>}

                            {random=='Scissors' && <div>
                                <img src="https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296853_960_720.png" className="pe-auto" style={{
                                        width: "150px", height:"150px"
                                    }} alt="Scissors"/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Result of the game */}
            <div className="mt-2">
                <h3>Result</h3>
                <div className="text-success">
                    {draw && <h2>Draw</h2>}
                    {win && <h2>You Win!</h2>}
                    {lose && <h2>You lose!</h2>}
                </div>
                <div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-success" scope="col">Wins</th>
                            <th className="text-danger" scope="col">Loses</th>
                            <th className="text-warning" scope="col">Draws</th>
                            <th>Total Games</th>
                        </tr>
                    </thead>
                    {
                        users.map(
                            user => (
                                <tr key={user.id} className="table-info">
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
        </div>
    )
}