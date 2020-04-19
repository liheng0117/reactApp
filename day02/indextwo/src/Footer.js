import React,{Component,Fragment} from 'react';
import './Footer.css';

class Footer extends Component{
	render(){
		let {crr} = this.props;
		return (
		   <div className="myfoot">
		      <p><span>收货人:</span>{crr[0].name}</p>
			  <p><span>手机号码:</span>{crr[0].tel}</p>
			  <p><span>收货地址:</span>{crr[0].addr}</p>
			  <p><span>支付方式:</span>{crr[0].teg}</p>
			  <p><span>配送方式:</span>{crr[0].pei}</p>
			  <p><span>下单时间:</span>{crr[0].time}</p>
		   </div>
		)
	}
}

export default Footer;


