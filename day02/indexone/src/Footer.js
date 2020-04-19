/*
import React from 'react';

class Footer extends React.Component{
	render(){
		return (
		   <div>Footer</div>
		)
	}
}

export default Footer;
*/

import React,{Component,Fragment} from 'react';

class Footer extends Component{
	render(){
		let {name,fn,arr} = this.props;
		return (
		   <Fragment>
		      <div>Footer1</div>
			  <div>Footer2</div>
			  
			  {name}
			  
			  <button onClick={fn}>点击一下</button>
			  {
				  arr.map((val)=>{
					  return (
					     <p key= {val.id}>{val.title}</p>
					  )
				  })
			  }
		   </Fragment>
		)
	}
}

export default Footer;
