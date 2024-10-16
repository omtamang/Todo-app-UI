import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addTodoApi, retriveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { Formik, Form, Field, ErrorMessage } from "formik"
import moment from "moment"

export default function TodoComponent() {

    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const navigate = useNavigate()

    useEffect(
        () => retriveTodos(),
        [id]
    )

    function retriveTodos() {

        if(id != -1)
            retriveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.error(error))
    }

    function onSubmit(values) {
        const todo = {
            id: id, 
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo)

        if(id == -1){
            addTodoApi(username, todo)
            .then(response => {
                console.log(response)
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
        else {
            updateTodoApi(username, id, todo)
            .then(response => {
                console.log(response)
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
        
    }

    function validate(values){
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid targetDate'
        }

        if(values.description.length<5){
            errors.description = "Enter at least 5 letters"
        }

        if(values.targetDate === null || values.targetDate === '' || !moment(values.targetDate).isValid())
            errors.targetDate = "Enter a target date"

        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Deatails</h1>
            <div>
                <Formik initialValues={{ description, targetDate}} 
                enableReinitialize={true}
                onSubmit={ onSubmit }
                validate={ validate }
                validateOnChange={ false }
                validateOnBlur={ false}
                >
                    {
                        (props) => (
                            <Form>
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="alert alert-warning"
                                    />
                                    <ErrorMessage
                                        name="targetDate"
                                        component="div"
                                        className="alert alert-warning"
                                    />
                                <fieldset className="form-group">
                                    <label>Description: </label>
                                    <Field type="text" className="form-control" name="description"></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"></Field>
                                </fieldset>

                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}