import React from 'react'
import Swiper from 'swiper'
import {getBanner} from '@/api/indexAPI'
import './style.less'

export default class Home extends React.Component {
  state = {
    result: [],
  }
  componentDidMount () {
    getBanner().then(res => {
        this.setState({
          result: res.data.data
        }, () => {
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            pagination: {
              el: '.swiper-pagination',
            },
            autoplay:{
            delay:2000,
            disableOnInteraction:false
            }
          })
        })
      })
  }

  render () {
    const { result } = this.state
    
    return (
      <div className="pages-home">
        
        {/* 滚动图片 */}
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              result.map(rt => {
                return (
                  <div 
                    key={rt.title} 
                    className="swiper-slide"
                  >
                    <img src={rt.image} className="img" alt="" />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
