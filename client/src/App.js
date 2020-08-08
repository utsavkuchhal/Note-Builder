import React from 'react';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login/Login';
import EditTodo from './Components/Edit/EditTodo';
import Register from './Components/Register/Register';
import Todos from './Components/Todos'
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnprivateRoute';
import Admin from './Components/Admin/Admin';
import Footer from './Components/Footer'
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App (){
    return(
      <Router>
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <UnPrivateRoute path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
      <PrivateRoute path="/todos" roles={["user","admin"]} exact component={Todos}/>
      <PrivateRoute path="/admin" roles={["admin"]} exact component={Admin}/>
      <PrivateRoute path = "/todos/:id" roles={["user","admin"]} exact component = {EditTodo} />
      <Footer />
        </Router>
    );
}

export default App;