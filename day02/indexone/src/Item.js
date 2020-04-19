import React from 'react';
// 子组件用函数props接受父组件传过来的值
function Item(props){
	let {title}=props;
	return (
	   <div>{title}</div>
	)
}

export default Item;