import React from 'react';
import ReactDOM from 'react-dom';   //  前端渲染页面 
import 'antd/dist/antd.css';   // antd样式 
import Router from './router'
import './index.less';
import '@/utils/rem'

ReactDOM.render(
    <Router />,
  document.querySelector('#root')
);
