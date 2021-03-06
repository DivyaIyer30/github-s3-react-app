import React from 'react';
import { getUser,resetUserSession } from './service/AuthService';

const PremiumContent = (props) => {
    const user=getUser();
    const name = user !== 'undefined' && user ? user.name : '';
    const logoutHandler = () => {
        resetUserSession();
        props.history.push('/login');
    }
    return (
        <div>
            Hello {name}! You have successfully logged in!!! Welcome to website. <br/>
            <input type = "button" value= "Logout" onClick={logoutHandler}/>

        </div>
    )
}

export default PremiumContent;