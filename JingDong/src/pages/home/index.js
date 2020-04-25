import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Foot from '@@/Foot'
import Banner from '@@/Banner'
import Nav from './Nav';
import List from './List';
import { Icon } from 'antd';
import './style.less'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1776886_3b51ja5i1bb.js', // 在 iconfont.cn 上生成
});

export default class home extends Component {
    render() {
        return (
            <div className="home">
               <div className="homeHead">
                 <p><MyIcon type="iconfenlei1" /></p>
                 <p><input type="text" placeholder="请输入搜索的商品" /></p>
                 <p><Link to="/login">登录</Link></p>
               </div>
               <div className="section">
                 <Banner />
                 <Nav />
                 <Nav />
                 <p className="img"><img src="img/homeimg.png" alt="" /></p>
                 <List />
               </div>
              <Foot />
            </div>
        )
    }
}

