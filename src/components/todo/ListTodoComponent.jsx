import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveTodoPathVariable } from './api/TodoApiService'
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function ListTodoComponent() {

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    
    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()

    useEffect( 
        () => refreshTodos(), [] 
    )

    function refreshTodos(){
        retrieveTodoPathVariable(username)
        .then(response => {
            setTodos(response.data)
        })
        .catch(error => console.log(error))
    }

    function deleteTodo(id){
        console.log('delete todo'  + id)
        deleteTodoApi(username, id)
        .then(
            () => {
                setMessage(`Delete of todo with ${id} successful`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id){
        console.log('update todo'  + id)
        navigate(`/todos/${id}`)
    }

    function addNewTodo (){
        navigate(`/todos/-1`)
    }

    return (
        <div className="container">
            <h1>Things You Want to do</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add new Todo</div>
        </div>
    )
}