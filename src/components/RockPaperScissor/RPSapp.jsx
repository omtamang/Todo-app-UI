import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import GameHeader from './GameHeader'
import MainGame from './MainGame'
import Welcome from './Welcome'
import Players from './Players'
import Login from './Login'
import AuthProvider, { useAuth } from './Security/GameAuth'
import ErrorComp from './ErrorComp'

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    
    if(authContext.isAuthenticated){
        return children
    }

    return <Navigate to="/" />
}

export default function RSPapp() {
    return (
        <div className='gameApp'>
            <AuthProvider>
                <BrowserRouter>
                    <GameHeader/>
                    <Routes>
                        <Route  path='/' element={<Login/>}/>
                        <Route  path='/welcome/:name' element={
                            <AuthenticatedRoute>
                                <Welcome/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/game' element={
                            <AuthenticatedRoute>
                                <MainGame/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/players' element={
                            <AuthenticatedRoute>
                                <Players/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/login' element={<Login/>}/>

                        <Route path='/*' element={<ErrorComp/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}