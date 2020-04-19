import React from 'react';
import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Item from './Item.js';

let aData=[
	{id:0,title:"标题1"},
	{id:1,title:"标题2"},
	{id:2,title:"标题3"},
]

function fn(){
	alert(111)
}


function App() {
  return (
    <div className="App">
      <Header/>
	  <div>Section</div>
	  {
		  aData.map((val)=>{
			  return (
			    <Item key={val.id} title={val.title} />
			  )
		  })
	  }
	  <Footer name="这是APP的footer" fn={fn} arr={aData}/>
    </div>
  );
}

export default App;
