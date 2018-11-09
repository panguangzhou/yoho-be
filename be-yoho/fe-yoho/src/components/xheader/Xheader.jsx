import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
class Xheader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            bool:false
        }
    }
    check(){
        let username =sessionStorage.getItem('yohoAdmin');
        this.setState({
            username
        })
    }
    componentWillMount(){
        this.check();
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">YOHO!<span>{this.state.username}</span></a>
                    <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" ref='search' />
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <Link className="nav-link" to="/login">Sign out</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Xheader;
