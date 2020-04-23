import React, { PureComponent } from 'react'
import cs from 'classnames'
import './styles.less'
import { BizIcon, Icon } from '../'
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      translation: 0
    }
  }
  componentDidMount() {
    
  }
  componentDidUpdate() {
    // let wapperRect = this.wapper.getBoundingClientRect()
    // if (document.querySelector('.nwd-page-tabs__item--check')) {
    //   let childRect = document.querySelector('.nwd-page-tabs__item--check').getBoundingClientRect()
    //   let wapperTotal = wapperRect.left + wapperRect.width 
    //   let childTotal = childRect.left + childRect.width
    //   console.log(wapperTotal, childTotal)
    //   if (wapperTotal < childTotal) {
    //     this.container.style.transform = `translateX(${Math.round(wapperTotal-childTotal)}px)`
    //   }
    // }
  
  }
  onClick = (item, e) => {
    e.stopPropagation()
    this.props.onChange && this.props.onChange(item, e)
  }
  onRemove = (item, idx, e) => {
    e.stopPropagation()
    this.props.onRemove && this.props.onRemove(item, idx, e)
  }
  onLeftClick = (e) => {
    e.stopPropagation()
    let lastChild = this.container.lastChild
    let childRect = lastChild.getBoundingClientRect()
    let wapperRect = this.wapper.getBoundingClientRect()
    let translation = Math.round(wapperRect.left - childRect.left)
    if (Math.abs(translation) > 0) {
      this.container.style.transform = `translateX(${translation}px)`
    }
  }
  onRightClick = e => {
    e.stopPropagation()
    this.container.style.transform = `translateX(0px)`
  }
  render() {
    const { schema = [], selectedKey } = this.props
    return (
      <div className="nwd-page-tabs">
        <div className="nwd-page-tabs__left" 
          onClick={this.onLeftClick}
        >
          <Icon type="backward" />
        </div>
        <nav ref={ref => this.wapper = ref}>
          <div 
            ref={ref => this.container = ref}
            className="nwd-page-tabs__list" 
            // style={style}
          >
          {
            Array.isArray(schema) && schema.map((item, idx) => (
              <div 
                key={idx}
                className={cs('nwd-page-tabs__item', {
                  'nwd-page-tabs__item--check': item.pathname === selectedKey
                })}
                onClick={e => this.onClick(item, e)}
                title={item.pathname}
              >
                <span className="nwd-page-tabs__item-title">{item.title}</span>
                {
                  idx !== 0 && (
                    <span 
                      className="nwd-page-tabs__item-x" 
                      onClick={e => this.onRemove(item, idx, e)}>
                     <Icon type="close-circle" theme="filled" />
                    </span>
                  )
                }
              </div>
            ))
          }
          </div>
        </nav>
        <div className="nwd-page-tabs__right" onClick={this.onRightClick}>
          <Icon type="forward" />
        </div>
        <div className="nwd-page-tabs__line" />
      </div>
    )
  }
}
