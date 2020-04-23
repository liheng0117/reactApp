import './styles.less'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { formatLocale } from '@/utils'
import {  Row, Col, Sheet, Card } from '@/components'
import { PASSWORD_COLUMN } from '@/constants/user'

export default
@connect(({ loading, router, user, app }) => ({
  router,
  user,
  loading: loading.effects['user/adminResetPassword'],
  app,
}))
class Reset extends PureComponent {
  onSubmit = () => {
    const { dispatch, app } = this.props
    this.form.getResult()
    .then(result => {
      dispatch({ 
        type: 'user/adminResetPassword', 
        payload: {...result, email: app.email}
      })
    })
    .catch(err => {
      console.log('错误的表单信息', err)
    })
  }
  render() {
    const { loading, app } = this.props
    const columns = [
      {
        label: formatLocale('common.ph.email'),
        id: 'text',
        type: 'Text',
        props: {
          children: app.email
        }
      },
      PASSWORD_COLUMN[0],
      PASSWORD_COLUMN[1],
      {
        label: formatLocale('common.save'),
        id: 'submit',
        type: 'Button',
        props: {
          onClick: this.onSubmit,
          loading: loading,
          children: formatLocale('common.save')
        }
      }
    ]
    return (
      <div className='resetpassword'>
        <Row>
          <Col span={16} offset={4} >
            <Card
              bordered={false}
              none-bordered="head"
            >
              <Sheet
                onChange={this.formChange}
                columns={columns} 
                wrappedComponentRef={ref => this.form = ref}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
