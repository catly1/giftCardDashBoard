import React from 'react';
import { login } from '../util/session_api'

export default function SessionForm(props) {
    console.log(props)
    const [email, setEmail] = React.useState("");
    const [storeID, setStoreID] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [errors,setErrors] = React.useState([]);

    const renderErrors = ()=>{
        return (
            <ul>
                {Object.keys(errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {errors[error]}
                    </li>
                ))}
            </ul>
        );   
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = {
            email: email,
            password: password
        }

        login(user).then(res =>{
            console.log(res)
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <br />
                    <input type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br />
                    <input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <br />
                    <input type="submit" value="Submit" />
                    {renderErrors()}
                </div>
            </form>
        </div>
    )
}