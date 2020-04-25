import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { Icon } from 'antd';
import './style.less'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1776886_nhad2qlnoyb.js', // 在 iconfont.cn 上生成
});

export default class Foot extends Component {
	render() {
		return (
			<div className="foot">
        <NavLink to="/home">
          <dl><dt><MyIcon type="iconshouye" /></dt><dd>首页</dd></dl>
        </NavLink>
        <NavLink to="/classification">
          <dl><dt><MyIcon type="iconfenlei" /></dt><dd>分类</dd></dl>
        </NavLink>
        <NavLink to="/assemble">
          <dl><dt><MyIcon type="iconfavorite" /></dt><dd>拼购</dd></dl>
        </NavLink>
        <NavLink to="/cart">
          <dl><dt><MyIcon type="icongouwuche" /></dt><dd>购物车</dd></dl>
        </NavLink>
        <NavLink to="/user">
          <dl><dt><MyIcon type="iconMy" /></dt><dd>我的</dd></dl>
        </NavLink>
			</div>
		)
	}
}
