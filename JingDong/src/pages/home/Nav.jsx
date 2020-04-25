import React, { Component } from 'react'
import {getNav} from '@/api/indexAPI'

export default class Nav extends Component {
  state = {
    navList:[]
  }
  componentDidMount(){
    getNav().then(res=>{
      this.setState({
        navList:res.data.data
      })
    })
  }
  render() {
    const { navList } = this.state
    return (
      <div className="nav">
        {
          navList.map(val=>{
            return (
              <dl key={val.cid}>
                <dt><img src={val.image} alt="" /></dt>
                <dd>{val.title}</dd>
              </dl>
            )
          })
        }
      </div>
    )
  }
}
