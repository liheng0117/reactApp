import './styles.less'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, ConfigProvider } from '@/components'
import { connect } from 'dva'

const { Header, Content } = Layout

export default
@connect(({ app, router }) => ({
  app,
  router
}))
class BasicLayout extends PureComponent {
  static childContextTypes = {
    protalElement: PropTypes.any,
  }
  constructor(props) {
    super(props)
    this.state = {
      protalElement: null
    }
    // props.dispatch({ type: 'cfgs/fetch' })
  }

  getChildContext() {
    return { 
      protalElement: this.state.protalElement
    }
  }
  render() {
    const { children, location } = this.props
    return ( 
        <Layout className="nwd-custom__layout" data-background="true">
          { location.pathname.includes('login') && <div className="nwd-custom__bg" /> }
          <Header className="nwd-custom__header">
            <div className="nwd-logo" />
          </Header>
          <Layout>
            <Content>
              <div className="nwd-wapper" ref={c => this.setState({ protalElement: c })} />
              <div className="nwd-container">
                <div className="nwd-container__content">{ children }</div>
              </div>
            </Content>
          </Layout>
        </Layout>
    )
  }
}

