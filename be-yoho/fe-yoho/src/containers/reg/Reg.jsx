import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Reg.css'
import axios from 'axios'
class Reg extends Component {
    componentDidMount() {
        (function () {
            let height = window.innerHeight;
            let width = window.innerWidth;
            let box = document.getElementsByClassName('regbox')[0];
            let left = (width - box.offsetWidth) / 2 + 'px';
            let top = (height - box.offsetHeight) / 2 + 'px';
            box.style.left = left;
            box.style.top = top;
        })()
    }
    reg() {
        let self = this;
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        if (username !== '' && username.length >= 6) {
            if (password !== '' && password.length >= 6) {
                axios.get('http://localhost:3000/api/kefu', {
                    params: {
                        username,
                        password
                    }
                })
                    .then(function (response) {
                        if (response.data == 'yes') {
                            self.refs.username.value = '';
                            self.refs.password.value = '';
                            self.props.history.push('/login');
                        } else {
                            alert('用户已存在')
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        }

    }
    render() {
        return (
            <div>
                <div className="regbox">
                    <h3>注册</h3>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="用户名" aria-describedby="basic-addon1" ref='username' />
                    </div>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="密码" aria-describedby="basic-addon1" ref='password' />
                    </div>
                    <div className="juzhong">
                        <button type="button" className="btn btn-default btn-xs" onClick={this.reg.bind(this)}>注册</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Reg;