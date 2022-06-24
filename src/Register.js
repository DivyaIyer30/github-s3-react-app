import React, {useState} from 'react';
import axios from 'axios';
import { baseUrl } from './App.js';

const registerUrl = baseUrl+"/register";
const Register = () => {
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[message,setMessage] = useState(null);

    const submitHandler = (event) =>{
        event.preventDefault();
        if(username.trim === '' || email.trim  === '' || name.trim === '' || password.trim === ''){
            setMessage('all fields are required');
            return;
        }
        setMessage(null);
        // console.log('submit button is pressed');
        const requestConfig ={
        headers: {
            'x-api-key': 'ajPjq2hvZ520RQheQwrvhl0kc4odoTb5tNsTd4N0'//process.env.REACT_APP_API_KEY
        }
       }
       const requestBody ={
        username : username,
        email :  email,
        password : password ,
        name : name

       }
       axios.post(registerUrl, requestBody, requestConfig).then(response =>
        {
            setMessage('Registeration Successful ');

        }).catch(error =>{
            if(error.response.status === 401 || error.response.status === 403){
                setMessage(error.response.data.message);

            }else{
                setMessage('sorry backend is not working');
            }
        })
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>
                    Register
                </h5>
                Name : <input type="text" placeholder="Enter your name here"value={name} onChange={event => setName(event.target.value)}/><br/>
                Email : <input type="text" placeholder="Enter e-mail ID"value={email} onChange={event => setEmail(event.target.value)}/><br/>
                Username : <input type="text" placeholder="Enter a username" value={username} onChange={event => setUsername(event.target.value)}/><br/>
                Password : <input type="password" placeholder="********" value={password} onChange={event => setPassword(event.target.value) }/><br/>
                <input type="Submit" class = "button" value="Register"/>
            </form>
            {message && <p className = "message">{message}</p>}
        </div>
    )
}

export default Register;