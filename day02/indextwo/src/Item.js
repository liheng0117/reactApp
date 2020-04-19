import React,{Component,Fragment} from 'react';
import './Item.css';

class Item extends Component{
	render(){
		let {brr} = this.props;
		return (
		   <div className="myitem">
			   <p><span>商品金额:</span><span>￥{brr}</span></p>
			   <p><span>应付金额:</span><span>￥{brr}</span></p>
		   </div>
		)
	}
}

export default Item;