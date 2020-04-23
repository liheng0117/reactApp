import './styles.less'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { connect } from 'dva'
import { ConfigProvider, Menus, TabNav, Menu, Icon, Dropdown, BizIcon } from '@/components'
import { MENUS } from '@/constants'
import { USER_OPTION } from '@/constants/'
import { qs, _ } from '@/utils'
const { Header, Content, Sider } = Layout
export default
@connect(({ app, crumb, router }) => ({
  app,
  router,
  crumb,
  option: USER_OPTION[app.platform]
}))
class BasicLayout extends React.Component {
  constructor(props) {
    super(props)
    this.onResizeStrategy = _.throttle(this.onResize, 300)
  }
  componentDidMount() {
    this.onResize()
    window.onresize = this.onResizeStrategy
  }
  onResize = () => {
    let element = document.querySelector('.nwd-table-content')
    if (element) {
      let { left, right, width } = element.getBoundingClientRect()
      const { dispatch } = this.props
      let scroll = width < 1440 ? { x: 1440 } : { x: false }
      dispatch({ type: 'app/updateState', payload: { 
        scroll: scroll
      }})
    } else {
      // console.log('这里没有table')
    }
  }
  onMenuClick = ({ key, item }) => {
    const { history } = this.props
    history.push(key)
  }
  onTabChange = ({ pathname, search }) => {
    const { history, location } = this.props
    if (location.pathname === pathname) return
    let params = qs.parse(search, { ignoreQueryPrefix: true })
    let query = qs.stringify(params, { addQueryPrefix: true })
    history.replace(`${pathname}${query}`)
  }
  onRemove = (item, index) => {
    const { history, dispatch } = this.props
    const payload = index
    dispatch({ type: 'crumb/remove', payload  })
    .then(({ pathname, search }) => {
      let params = qs.parse(search, { ignoreQueryPrefix: true })
      let query = qs.stringify(params, { addQueryPrefix: true })
      this.props.history.replace(`${pathname}${query}`)
    })
  }
  doIntensify() {
    const rule = this.props.app.platform
    let prefix = rule === 'frontend' ? '' : '/admin'
    return MENUS.reduce((arr, curr) => {
      if (curr.rule) {
        return curr.rule === rule ? [...arr, {
          ...curr, 
          key: `${prefix}${curr.key}` 
        }] : arr
      } else {
        return Array.isArray(curr.children) ? [ ...arr, {
          ...curr,
          key: `${prefix}${curr.key}`,
          children: curr.children.reduce((pre, next) => (!next.rule || next.rule === rule ? [ ...pre, next ] : pre), [])
        }] : [ ...arr, { 
          ...curr, 
          key: `${prefix}${curr.key}` 
        }]
      }
    }, []).map(({ children, ...item }) => Array.isArray(children) && children.length === 1 ? item : { ...item, children })
  }
  onOverlayClick = ({ key }) => {
    const { option, history } = this.props
    let current = option[key]
    if (current.link) {
      history.push(current.link)
      return 
    } 
    if (current.click) {
      current.click()
      return 
    }
  }
  dropdownInit = (option) => {
    return (
      <Menu className='dropdown-menu_top' width={200} onClick={this.onOverlayClick}>
        {
          option.map((item, idx) => (
            <Menu.Item key={idx}>
              <BizIcon type={item.icon} />
              {item.title}
            </Menu.Item>)
          )
        }
      </Menu>
    )
  }
  render() {
    const { children, location, app, option, crumb, platform } = this.props
    return (
        <Layout className="nwd-custom__layout">
          <Header className="nwd-custom__header">
            <div className="nwd-logo"/>
            <Dropdown overlay={this.dropdownInit(option)}>
              <span>
                {app.email} <Icon type="down" />
              </span>
            </Dropdown>
          </Header>
          <Layout>
            <Sider className="nwd-custom__sider" collapsedWidth="0">
              <Menus 
                option={this.doIntensify(platform)} 
                onClick={this.onMenuClick} 
                selectedKey={location.pathname}
              />
            </Sider>
            <Content id='nwd-layout-content'>
              <TabNav 
                schema={crumb} 
                selectedKey={location.pathname}
                onChange={this.onTabChange}
                onRemove={this.onRemove}
              />
              <div className="nwd-container">
                <div className="nwd-container__content"> { children }</div>
              </div>
            </Content>
          </Layout>
        </Layout>
    )
  }
}

