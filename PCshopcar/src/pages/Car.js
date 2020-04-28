import React, { Component } from 'react'
import {connect} from 'react-redux'

class Car extends Component {

    //  点击删除购物车的某条数据
    removeCar=(id)=>{
        let myData =  JSON.parse(localStorage.getItem("cardata"));
        myData = myData?myData:[];
        // 循环遍历  根据id判断  删除该条数据
        myData = myData.filter((val)=>{
           return val.id !== id
       })
       //  把新数组存在本地
       localStorage.setItem("cardata",JSON.stringify(myData));
       //  解构action里的方法   并且调用
        const {removeCar} = this.props
        removeCar(myData)
    }

    // 总价  总数 
    getAllFn(){
        const datas = this.props.list;
        let priceAll = 0
        let numAll = 0

        datas.forEach(val=>{
            priceAll+=val.price*val.num;
            numAll+=val.num;
        })
        return{ priceAll,numAll }
    }

    //清空购物车
    allDle=()=>{
        let allData=[]
        localStorage.setItem("cardata",JSON.stringify(allData));
        const {removeCar} = this.props
        removeCar(allData)
    }
    
    render() {
        const data =this.props.list;
        let {priceAll,numAll}=this.getAllFn()
        console.log(222,data)
        return (
            <div>
                <h3>我的购物车</h3>
                <table>
                    <thead>
                        <tr>
                        <th>id</th><th>名称</th><th>价格</th><th>数量</th><th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length===0 ? <tr><td colSpan='5'> 购物车空空如也...</td></tr> :
                            data.map(val=>{
                                return(
                                    <tr key={val.id}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.price}</td>
                                        <td>{val.num}</td>
                                        <td><button onClick={()=>this.removeCar(val.id)}>删除</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                         <tr>
                             <td colSpan="2">总数：{numAll}</td>
                             <td colSpan="2">总价：{priceAll}</td>
                             <td><button onClick={this.allDle}>清空购物车</button></td>
                         </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default connect(
    state => ({ list: state.list }),
    {
        removeCar(payload) {
          return { type: 'remove_car', payload }
        }
    }
)(Car)
