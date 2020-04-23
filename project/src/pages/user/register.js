import './styles.less'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { formatLocale, _, } from '@/utils'
import {  Row, Col, Sheet, Card } from '@/components'
import { REGISTER_SHEET } from '@/constants/user'

export default
@connect(({ loading, router, app, user, cfgs }) => ({
  loading: loading.effects['register/register'],
  router,
  app,
  user,
  cfgs
}))
class Register extends PureComponent {
  static contextTypes = {
    protalElement: PropTypes.any
  }
  componentDidMount(){
    const { dispatch } = this.props
    dispatch({ type: 'app/updateState', payload: { platform: 'frontend' } })
  }
  onSubmit = () => {
    const { dispatch } = this.props
    Promise.all([this.accountDetail.getResult(), this.userDetail.getResult()])
    .then(result => {
      dispatch({ 
        type: 'user/register', 
        payload: result
      })
    })
    .catch(err => {
      console.log('错误的表单信息', err)
    })
  }
  render() {
    let SIGNUPArr = [
      {
        id: 'submit',
        type: 'Button',
        props: {
          children: formatLocale('common.signup'),
          type: 'danger',
          onClick: this.onSubmit,
          style: { height: '48px', fontSize: '16px', width: '100%' }
        }
      }
    ]
    return (
      <>
        <div className='register-title'>{formatLocale('common.signup')}</div>
        <Row className='register-row'>
          <Col span={16} offset={4} >
            <Card
              bordered={false}
              none-bordered="head"
              title={formatLocale('user.register.detail_account')} 
            >
              <Sheet
                columns={REGISTER_SHEET.ACCOUNT} 
                wrappedComponentRef={ref => this.accountDetail = ref}
              />
            </Card>
            <div className='line'/>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4} >    
            <Card
              bordered={false}
              none-bordered="head"
              title={formatLocale('user.register.detail_user')} 
            >
              <Sheet
                onChange={this.onUserChange}
                columns={REGISTER_SHEET.USER.concat(SIGNUPArr)} 
                wrappedComponentRef={ref => this.userDetail = ref}
              />
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
