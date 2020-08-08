import React from 'react';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";

const TodoItem = props =>{
    return (
        <div className = "note">
        <p>{props.todo.name} </p>
        <button className = 'note' >
        <Link  style = {{color : "#f5ba13"}}to = {"/todos/" + props.todo._id}><EditIcon /></Link>
        </button>
         <button className = 'note'>
         <a style = {{color : "#f5ba13"}} href="#" onClick = {() => {props.deleteTodo(props.todo._id)}}><DeleteIcon /></a>
         </button>
        </div>
    )
}

export default TodoItem;