import React, { Component } from 'react'
import Foot from '@@/Foot'
import {Route,Switch,Redirect} from 'react-router-dom'
import { Icon } from 'antd';
import './style.less'
import Left from './Left';
import Right from './Right';

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1776886_xhjzjw67d9.js', // 在 iconfont.cn 上生成
});

export default class classification extends Component {
    goBack = () =>{
        this.props.history.goBack()
    }
    render() {
        return (
            <div className="cation">
                <div className="cationHead">
                  <p onClick={this.goBack}><MyIcon type="iconxiangzuojiantou" /></p>
                  <p><input type="text" placeholder="游戏本" /></p>
                  <p><MyIcon type="icongengduomore10" /></p>
                </div>
               <div className="section">
                 <Left />
                 <Switch>
                    <Route path="/classification/:id" component={Right} />
                    <Redirect to="/classification/492" />
                </Switch>
               </div>
               <Foot />
            </div>
        )
    }
}
