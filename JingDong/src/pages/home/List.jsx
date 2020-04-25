import React, { Component } from 'react'
import {getList} from '@/api/indexAPI'

export default class List extends Component {
  state = {
    goodList:[]
  }
  componentDidMount(){
    getList().then(res=>{
      this.setState({
        goodList:res.data.data
      })
    })
  }
  render() {
    const { goodList } = this.state
    return (
      <div className="list">
      {
        goodList.map(val=>{
          return (
            <dl key={val.gid}>
              <dt><img src={val.image} alt="" /></dt>
              <dd>￥{val.price}</dd>
            </dl>
          )
        })
      }
      </div>
    )
  }
}
