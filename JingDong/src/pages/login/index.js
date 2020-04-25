import React, { Component } from 'react'
import {getLogin} from '@/api/indexAPI'
import './style.less'

class Login extends Component {
    state={
        username:"",
        pwd:""
     }
     changeFn=(e,key)=>{
        this.setState({
            [key]:e.target.value
        })
     }
     loginFn=()=>{
        const {history}= this.props;
        getLogin(this.state).then(res=>{
            if (res.data.status==='200') {
                localStorage.setItem('user',JSON.stringify(res.data.data))
                history.push('/')
            }else{
                alert(res.data.message)
            }
        })
     }
    render() {
        const {username,pwd} = this.state;
        return (
            <div className="login">
                <div className="loginHead">
                  <p>京东登录</p>
                </div>
                <div className="loginSec">
                  <p><input type="text" placeholder="用户名/邮箱" value={username} onChange={(e)=>this.changeFn(e,'username')} /></p>
                  <p><input type="text" placeholder="请输入密码" value={pwd} onChange={(e)=>this.changeFn(e,'pwd')} /></p>
                  <p><button onClick={this.loginFn}>登录</button></p>
                </div>
            </div>
        )
    }
}

export default Login;