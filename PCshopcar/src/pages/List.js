import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Shoplist extends Component {
    state={
        datas:[]
    }
    //  周期函数   请求本地数据
    componentDidMount(){
        axios.get('/goods.json')
        .then(res=>{
            this.setState({
                datas:res.data.data
            })
            //   把请求到的数据放到本地 
            localStorage.setItem('allData',JSON.stringify( res.data.data))
        })
    }
    //  点击添加购物车  
    intoCar=(info)=>{ 
        // 调用action里的方法   并把该条数据都传过去
       const { addCar } = this.props; 
       addCar(info) 
    }
    
    render() {
        const {datas} = this.state
        console.log(this.props)
        let data= this.props.alllist === [] ? this.props.alllist : datas
        return (
            <div>
               <h3>全部商品</h3>
               <table>
                   <thead>
                       <tr>
                         <th>id</th><th>名称</th><th>价格</th><th>操作</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           data.map(val=>{
                               return(
                                   <tr key={val.id}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.price}</td>
                                        <td><button onClick={()=>this.intoCar(val)}>加入购物车</button></td>
                                   </tr>
                               )
                           })
                       }
                   </tbody>
               </table>
            </div>
        )
    }
}

export default connect(
    state => ({ alllist: state.alllist }),
    {
        addCar(payload) {
            return { type: 'add_car', payload }
        }
    }
)(Shoplist)
