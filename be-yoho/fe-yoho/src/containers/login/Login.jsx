import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'
import './Login.css'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radio: ''
        }
    }
    componentDidMount() {
        (function () {
            let height = window.innerHeight;
            let width = window.innerWidth;
            let box = document.getElementsByClassName('box')[0];
            let left = (width - box.offsetWidth) / 2 + 'px';
            let top = (height - box.offsetHeight) / 2 + 'px';
            box.style.left = left;
            box.style.top = top;
        })()
    }
    //查看单选按钮点击的状态,并修改redio的值
    check(x) {
        let radio = x;
        this.setState({
            radio
        })
    }
    login() {
        let self = this;
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let radio = this.state.radio;
        if(radio!==''){
            if(username!==''&&username.length>=6){
                if(password!==''&&password.length>=6){
                    axios.get('http://localhost:3000/api/admin',{
                        params:{
                            radio,
                            username,
                            password
                        }
                    })
                    .then(function(respone){
                        if(respone.data==='yes'){
                            if(radio===1){
                                sessionStorage.setItem('yohoAdmin','老板')
                            }else if(radio===2){
                                sessionStorage.setItem('yohoAdmin','管理员')
                            }else if(radio===3){
                                sessionStorage.setItem('yohoAdmin','打工仔')
                            }
                            self.refs.username.value='';
                            self.refs.password.value='';
                            self.setState({
                                radio:''
                            })
                            self.props.history.push('/home')
                        }else{
                            alert('登录错误')
                        }
                    })
                    .catch(function(error){
                        console.log(error)
                    })
                }
            }
        }
    }
    reg() {
        console.log(this)
        this.props.history.push('/reg')
    }
    render() {
        return (
            <div>
                <div className="box">
                    <p>登录</p>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="用户名" aria-describedby="basic-addon1" ref='username' />
                    </div>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="密码" aria-describedby="basic-addon1" ref='password' />
                    </div>
                    <div className='user'>
                        <input type="radio" name='radio' ref='boos' onClick={this.check.bind(this, 1)} />老板
                    <input type="radio" name='radio' ref='admin' onClick={this.check.bind(this, 2)} />管理员
                    <input type="radio" name='radio' ref='kefu-admin' onClick={this.check.bind(this, 3)} />普通员工
                    </div>
                    <div className='fl'>
                        <button type="button" className="btn btn-default btn-xs" onClick={this.login.bind(this)}>登录</button>
                    </div>
                    <div className="fr">
                        <button type="button" className="btn btn-default btn-xs" onClick={this.reg.bind(this)}>注册</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;