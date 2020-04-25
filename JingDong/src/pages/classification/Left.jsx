import React, { Component } from 'react'
import {getType} from '@/api/indexAPI'
import {NavLink} from 'react-router-dom'

export default class Left extends Component {
  state = {
    typeData:[]
  }
  componentDidMount(){
    getType().then(res=>{
      this.setState({
        typeData:res.data.data
      })
    })
  }
  render() {
    const {typeData} = this.state
    return (
      <div className="leftSec">
      {
        typeData.map(v=>{
          return(
            <p key={v.cid}><NavLink to={`/classification/${v.cid}`}>{v.title}</NavLink></p>
          )
        })
      }
      </div>
    )
  }
}
