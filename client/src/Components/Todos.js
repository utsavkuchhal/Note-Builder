import React, {useState,useContext,useEffect} from 'react';
import TodoItem from './TodoItem';
import TodoService from '../services/TodoService';
import Message from './Message';
import { AuthContext } from '../Context/AuthContext';
import AddIcon from "@material-ui/icons/Add";

const Todos = props =>{
    const [todo,setTodo] = useState({name : ""});
    const [todos,setTodos] = useState([]);
    const [isExpanded, setExpanded] = useState(false);
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    
    useEffect(()=>{
        TodoService.getTodos().then(data =>{
            setTodos(data.todos);
        });
    },[]);

    const expand = () => {
        setExpanded(true);
      }


    const onSubmit = e =>{
        e.preventDefault();
        TodoService.postTodo(todo).then(data =>{
            const { message } = data;
            resetForm();
            if(!message.msgError){
                TodoService.getTodos().then(getData =>{
                    setTodos(getData.todos);
                    setMessage(message);
                });
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
    }

    const deleteItem = (id) =>{
        TodoService.deleteTodo(id).then(data =>{
            const { message } = data;
            if(!message.msgError){
                TodoService.getTodos().then(getData =>{
                    setTodos(getData.todos);
                    setMessage(message);
                });
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
        window.location = "/todos"
    }

    const onChange = e =>{
        setTodo({name : e.target.value});
    }

    const resetForm = ()=>{
        setTodo({name : ""});
    }

    return(
        <div>
            
            <form onSubmit={onSubmit} className = 'create-note'>
                <label htmlFor="todo"><h3 onClick = {expand}>Take a note</h3></label>
                { isExpanded &&(
                <textarea type="text" 
                       name="todo" 
                       value={todo.name} 
                       rows={isExpanded ? 3 : 1}
                       onChange={onChange}
                       className="form-control"
                       placeholder="note..."/>)
                }
                <button 
                        type="submit"><AddIcon /></button>
            </form>
                {
                    todos.map(todo =>{
                        return <TodoItem key={todo._id} todo={todo} deleteTodo = {deleteItem}/>
                    })
                }
            <br/>
            {/* {message ? <Message message={message}/> : null} */}
        </div>
    );

}

export default Todos;