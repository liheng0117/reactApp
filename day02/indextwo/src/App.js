import React from 'react';
import './App.css';
import Header from './Header.js';
import Section from './Section.js';
import Footer from './Footer.js';
import Item from './Item.js';

let dataModel={
	aData:[
		{id:0,title:"相宜本草百合高保湿套装",num:"1.0",price:"188.00",prc:"img/img1.png"},
		{id:1,title:"相宜本草百滋养紧致眼霜",num:"1.0",price:"49.00",prc:"img/img2.png"},
	],
	bData:"237.00",
	cData:[
		{id:0,name:"15966198337",tel:"15966198337",addr:"北京市 昌平区 三旗百汇店",teg:"货到付款",pei:"自提",time:"2018-04-14 20:51:06"},
	]
}


function App() {
  return (
    <div className="App">
      <Header/>
	  <Section arr={dataModel.aData}/>
	  <Item brr={dataModel.bData}/>
	  <Footer crr={dataModel.cData}/>
    </div>
  );
}

export default App;
