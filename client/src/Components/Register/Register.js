import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../../services/AuthService';
import Message from '../Message';
import '../Login/login.css';
import HighlightIcon from "@material-ui/icons/Highlight";

const Register = props=>{
    const [user,setUser] = useState({username: "", password : "", role : ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", password : "",role : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }



    return(
        <div className = 'text-center'>
            <HighlightIcon />

            <form onSubmit={onSubmit} className = 'form-signin'>
                <h3 >Please Register</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       style = {{borderRadius : "25px"}}
                       className="form-control m-2" 
                       placeholder="Enter Username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       style = {{borderRadius : "25px"}}
                       onChange={onChange} 
                       className="form-control m-2" 
                       placeholder="Enter Password"/>
                <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}
                         
                       onChange={onChange} 
                       style = {{borderRadius : "25px"}}
                       className="form-control m-2" 
                       placeholder="Enter role (admin/user)"/>
                <button className="btn btn-lg btn-primary btn-block m-2" 
                         style = {{borderRadius : "25px"}}
                        type="submit">Register</button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Register;