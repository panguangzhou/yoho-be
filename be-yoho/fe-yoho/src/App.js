import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './css/dashboard.css'

//第一层路由
import Login from './containers/login/Login.jsx'
import Reg from './containers/reg/Reg.jsx'
import Home from './containers/home/home.jsx'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
              
              <Route path='/' exact component={Login}/>
              <Route path='/login' component={Login}/>
              <Route path='/reg' component={Reg} />
              <Route path='/home' component={Home}/>
            </ div >
      </Router>
    );
  }
}

export default App;
