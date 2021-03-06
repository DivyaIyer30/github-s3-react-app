import React, {useState} from 'react';
import {setUserSession} from './service/AuthService'
//import axios from 'axios';
import axiosInstance from "./index.js";

//const loginAPIUrl = "https://954agpq9fl.execute-api.us-east-1.amazonaws.com/dev/login";
const Login = (props) => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[errorMessage,setErrorMessage] = useState(null);

    const submitHandler = (event) =>{
        event.preventDefault();
        if(username.trim === '' || password.trim === ''){
            setErrorMessage('Both Username and password fields are required');
            return;
        }
        setErrorMessage(null);
        // console.log('submit button is pressed');
        const requestConfig ={
        headers: {
            'x-api-key': '7JKQRCuKLo5xs1hVmt8JP5ipHJXlRy5f6zlju0V4'//process.env.REACT_APP_API_KEY
        }
       }
       const requestBody ={
        username : username,
        password : password 
       }
       //axios.post(loginAPIUrl, requestBody, requestConfig).then(response =>
       axiosInstance.post('/login', requestBody, requestConfig).then(response =>
        {
            setUserSession(response.data.user, response.data.token);
            props.history.push('/premium-content');

        }).catch(error =>{
            if(error.response.status === 401 || error.response.status === 403){
                setErrorMessage(error.response.data.message);

            }else{
                setErrorMessage('sorry backend is not working');
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>
                    Login
                </h5>
                Username : <input type="text" placeholder="enter your name" id="uname"value={username} onChange={event => setUsername(event.target.value)}/><br/>
                Password : <input type="password" placeholder="********" value={password} onChange={event => setPassword(event.target.value)}/><br/>
                <input type="Submit" class="button" value="Login"/>
                </form>
                {errorMessage && <p className = "message">{errorMessage}</p>}
        </div>
    )
}

export default Login;