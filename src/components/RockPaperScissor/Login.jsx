import { Formik, Field, Form, ErrorMessage} from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Security/GameAuth";

export default function Login() {
    const navigate = useNavigate()

    const authContext = useAuth()
    const [username, setUsername] = useState("Cypher")
    const [password, setPassword] = useState('')
    
    function onSubmit(values) {
        if(authContext.login(values.username, values.password)){
            navigate(`/welcome/${values.username}`)
        }
    }

    function validate(values){
        let error ={}
        if(values.password !== 'dummy'){
            error.password = "Enter a correct password"
        }
        return error
    }
    return (
        <div className="container">
            <h3>It's time to login</h3>
            <Formik
             initialValues={{ username, password }}
             enableReinitialize={true}
             onSubmit={onSubmit}
             validate={validate}
             validateOnChange={false}
             validateOnBlur={false}
            >
                {
                        (props) => (
                        <Form>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group mt-5">
                                <label>UserName</label>
                                <Field type="text" className="form-control" name="username"/>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Password</label>
                                <Field type="password" className="form-control" name="password"/>
                            </fieldset>

                            <div className="mt-5">
                                <button className="btn btn-success" type="submit">Login</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}