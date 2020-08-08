import React, {useState,useContext} from 'react';
import AuthService from '../../services/AuthService';
import Message from '../Message';
import {AuthContext} from '../../Context/AuthContext';
import HighlightIcon from "@material-ui/icons/Highlight";
import './login.css'

const Login = props=>{
    const [user,setUser] = useState({username: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            }
            else
                setMessage(message);
        });
    }



    return(
        <div className = 'text-center'>
            <HighlightIcon />
            <form onSubmit={onSubmit} className = 'form-signin'>
                <h3>Please sign in</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       style = {{borderRadius : "25px"}}
                       onChange={onChange} 
                       className="form-control m-2" 
                       placeholder=" Enter Email"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password" 
                       style = {{borderRadius : "25px"}}
                       onChange={onChange} 
                       className="form-control m-2" 
                       placeholder="Enter Password"/>
                <button className="btn btn-lg btn-primary btn-block m-2" 
                        style = {{borderRadius : "25px"}}
                        type="submit">Log in </button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Login;