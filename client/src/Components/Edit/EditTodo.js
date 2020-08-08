import React, {useState, useEffect,useContext} from 'react';
import Message from '../Message';
import TodoService from '../../services/TodoService';
import { AuthContext } from '../../Context/AuthContext';
import DoneIcon from '@material-ui/icons/Done';

function EditTodo(props) {
    
    const [todo,setTodo] = useState({name : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        TodoService.getTodo(props.match.params.id)
        .then(data =>{
           
            setTodo((prevValue) => {
                return{
                    ...prevValue,
                    name : data.document.name
                }
            });
        });
    },[props.match.params.id]);

    const onSubmit = e =>{
        e.preventDefault();
        TodoService.updateTodo(todo,props.match.params.id).then(data =>{
            const { message } = data;
            if(!message.msgError){
                    setMessage(message);
            }
            else if(message.msgBody === "UnAuthorized"){
                setMessage(message);
                authContext.setUser({username : "", role : ""});
                authContext.setIsAuthenticated(false);
            }
            else{
                setMessage(message);
            }
        });
        window.location = "/todos";
    }


    const onChange = e =>{
        setTodo({name : e.target.value});
    }


    return (
        <div>
                <form className = 'create-note' onSubmit={onSubmit}>
                <label htmlFor="todo"><h3>Edit</h3></label>
                <input type="text" 
                       name="todo" 
                       value={todo.name} 
                       onChange={onChange}
                       className="form-control"
                       placeholder="Please Enter Todo"/>
                <button
                        type="submit"><DoneIcon /></button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default EditTodo;
