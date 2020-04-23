import './styles.less'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import { formatMessage } from 'umi-plugin-locale'
import { Icon, Button, Sheet, Row, Col, BizIcon} from '@/components'

export default
@connect(({ loading, login, app, user }) => ({
  loading: loading.effects['user/dologin'],
  app,
  login,
  user,
}))
class Login extends PureComponent {
  onSubmit = async () => {
    const  { dispatch, app } = this.props
    let value = this.formRef && (await this.formRef.getResult())
    dispatch({ 
      type: 'user/dologin', 
      platform: app.platform,
      payload: value
    })
  }
  onChange = (value) => {
    const { dispatch } = this.props
    dispatch({ 
      type: 'user/updateState',
      payload: { value, error: null } 
    })
  }
  componentDidMount(){
    window.onkeyup = e => e.keyCode === 13 && this.onSubmit()
    const  { dispatch } = this.props
    let platform = window.location.pathname.includes('admin') ?  'backend' :  'frontend'
    dispatch({ type: 'app/updateState', payload: { platform } })
  }
  render() {
    const { loading, user } = this.props
    const dataSources = [
      { 
        id: 'email', 
        type: 'Input', 
        required: formatMessage({ id: 'common.enterEmail' }), 
        verify: ['email', formatMessage({ id: 'common.invalidEmail' })],
        props: {
          placeholder: formatMessage({ id: 'common.ph.email' }),
          prefix: <BizIcon type="mail-o" />
        }
      },
      { 
        id: 'password', 
        type: 'Input', 
        required: formatMessage({ id: 'common.enterPassword' }), 
        props: {
          type: 'password',
          placeholder: formatMessage({ id: 'common.ph.password' }),
          prefix: <BizIcon type="lock" />,
          type: 'password'
        }
      },
    ]
    return (
      <div className="login">
        <div className="login-content">
          <div className="login-form">
            <div className="login-form_title">
              {formatMessage({ id: 'user.login.title' })}
              { user.error && <div className="login-error">{user.error.msg}</div> }
            </div>         
            <Sheet
              wrapperCol={24}
              columns={dataSources}
              value={user.value}
              onChange={this.onChange}
              wrappedComponentRef={ref => this.formRef = ref}
            />
            <Row>
              {
                this.props.platform === 'frontend' && (
                  <Col>
                    <Link to="/user/forgetPassword">{formatMessage({ id: 'user.login.forgetpassword' })}</Link>
                  </Col>
                )
              }
              <Col>
                <Button 
                  type='primary' 
                  loading={loading} 
                  onClick={this.onSubmit}
                >
                  {formatMessage({ id: 'common.login' })}
                </Button>
              </Col>
              {
                this.props.platform === 'frontend' && (
                  <Col>
                    {formatMessage({ id: 'user.login.sign1' })} &nbsp;&nbsp;            
                    <Link to="/user/register">
                      {formatMessage({ id: 'user.login.sign2' })}  
                    </Link>
                  </Col>
               )
              }
            </Row>
          </div>
        </div>
      </div>
    )
  }
}