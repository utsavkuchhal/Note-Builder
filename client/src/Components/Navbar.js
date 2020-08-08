import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import './scss/navbar.css'
import HighlightIcon from "@material-ui/icons/Highlight";

const Navbar = props =>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <>
             <li>
                <Link to="/" className = 'link'>
                        Home
                </Link>  
            </li>
            <li>
                <Link to="/login"  className = 'link'>
                        Login
                </Link>  
            </li>
            <li className = 'link'>
                <Link to="/register" className = 'link'>
                        Register
                </Link>  
            </li>
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                <li>
                <Link className = 'link' to="/todos">
                        Todos
                </Link> 
                </li>
                {
                    user.role === "admin" ? 
                    <li>
                    <Link className = 'link' to="/admin">
                            Admin
                    </Link> 
                    </li>: null
                }  
                <li style = {{float : "right"}}>
                <a href = "#" 
                        type="button logout" 
                        style = {{float : "right"}}
                        className="link" 
                        onClick={onClickLogoutHandler}>Logout</a>
                </li>
            </>
        )
    }
    return(
   
        <nav style = {{backgroundColor : "#f5ba13"}} className="navbar navbar-expand-lg navbar-light">
            <Link to="/">
            <h1 style = {{color: "white"}}><HighlightIcon/>Keeper</h1>
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                </ul>
            </div>
        </nav>

    )
}

export default Navbar;