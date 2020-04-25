import React, { Component } from 'react'
import {typeList} from '@/api/indexAPI'

export default class Right extends Component {
  state = {
    data:[]
  }
  componentDidMount(){
    let cid=this.props.match.params.id
    typeList(cid).then(res=>{
      this.setState({
        data:res.data.data
      })
    })
  }
  componentWillReceiveProps(nextProps){
    let cid=nextProps.match.params.id
    typeList(cid).then(res=>{
      this.setState({
        data:res.data.data
      },()=>{
        document.getElementsByClassName('rightSec')[0].scrollTop=0
      })
    })
  }

  render() {
    const {data} = this.state
    return (
      <div className="rightSec">
        {
          data instanceof Array===false ?<p>{data}</p>:data.map(val=>{
            return(
              <div key={val.cid}>
                <h1>{val.title}</h1>
                {
                  val.goods instanceof Array===false ? null : val.goods.map(v=>{
                    return(
                      <dl key={v.gid}>
                        <dt><img src={v.image} alt="" /></dt>
                        <dd>{v.title}</dd>
                      </dl>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
