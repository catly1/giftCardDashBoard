import React from 'react';
import { login, signup } from '../util/session_api'
import { Link } from 'react-router-dom'

export default function SessionForm(props) {
    const [email, setEmail] = React.useState("");
    const [storeID, setStoreID] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [errors,setErrors] = React.useState({});
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

    const handleResponse = (res) => {
        if(!res.success) {
            setErrors(res)
            return
        };

        window.location.reload();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = {
            email: email,
            password: password,
            password2: password2,
            storeID: storeID
        }

        if (props === "login"){
            login(user).then(res => {
                handleResponse(res)
            })
        } else if (props === "signup"){
            signup(user).then(res =>{
                handleResponse(res)
            })
        }
   
    }

    const renderForm = () => {
        switch(props){
            case "login":
                return(
                <div>
                    <h1>Log In</h1>
                    <br />
                    <input type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <br />
                    <input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <br />
                    <input type="submit" value="Login" /> or <Link to={"/signup"}>Sign Up</Link>
                </div>
                )
            case "signup":
                return(
                <div>
                    <h1>Sign Up</h1>
                    <br />
                    <input type="text"
                        value={email}
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br />
                    <input type="text"
                        value={storeID}
                        placeholder="Store ID"
                        onChange={e => setStoreID(e.target.value)}
                    />
                    <br />
                    <input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <br />
                    <input type="password"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        placeholder="Confirm Password"
                    />
                    <br/>
                    <input type="submit" value="Sign Up" /> or <Link to={"/login"}>Log In</Link>
                </div>
                )
            default:
                return <div></div>
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {renderForm()}
                    <br />
                    {renderErrors()}
                </div>
            </form>
        </div>
    )
}