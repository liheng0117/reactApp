import React,{Component,Fragment} from 'react';
import './Section.css';

class Section extends Component{
	render(){
		let {arr} = this.props;
		
		function fn(index){
			console.log(arr[index])
		}
		
		return (
		   <div className="mysection">
			  {
				  arr.map((val)=>{
					  return (
					     <dl key= {val.id}>
						      <dt><img src={val.prc}/></dt>
							  <dd>
							      <p>{val.title}</p>
								  <p>X{val.num}</p>
								  <p>￥{val.price}</p>
							  </dd>
							  <dd>
							       <button onClick={()=>{fn(val.id)}}>删除</button>
							  </dd>
						 </dl>
					  )
				  })
			  }
		   </div>
		)
	}
}

export default Section;