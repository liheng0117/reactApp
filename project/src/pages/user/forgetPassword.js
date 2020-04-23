import './styles.less'
import React, { Component } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import { formatLocale, MD5 } from '@/utils'
import { routerRedux } from 'dva/router'
import { Steps, Sheet, Button, Icon } from '@/components'
import { FORGET_PASSWORD, PASSWORD_COLUMN } from '@/constants/user'
const { Step } = Steps

export default 
@connect(({ forgetPassword, loading }) => ({
	forgetPassword,
	effects: loading.effects
}))
class Content extends Component {
	verificationSubmit = () => {
    this.verificationRef.getResult()
    .then(values => {
      this.props.dispatch({ type:'forgetPassword/forgetCheck', payload: values })
    })
    .catch(err => {
      console.log('错误的表单信息', err)
    })
	}
	passwordResetSubmit = () => {
    const { dispatch, forgetPassword } = this.props
    this.passwordResetRef.getResult()
    .then(values => {
      dispatch({
        type: 'forgetPassword/updatePasswordByEmail', 
        payload: { 
          password: MD5(values.password),
          confirm_password: MD5(values.confirm_password),
          email: forgetPassword.email
        },
      })
    })
    .catch(err => {
      console.log('错误的表单信息', err)
    })
  }
  goLogin() {
		this.props.dispatch(routerRedux.replace('/user/login'))
		this.props.dispatch({ 
      type:'forgetPassword/updateState',
			payload: { progress: 'verification' },
		})
	}
	render() {
    const { forgetPassword, effects, } = this.props
    const { progress, current, email } = forgetPassword
    const steps = [
      { title: 'verificationEmail' },
      { title: 'passwordReset' },
      { title: 'finished' },
    ]
		return (
		<div className="forget">
		  <div className="forget-box">
		  	<div className="forget-box__title">
		  		<span style={{color:'#444', fontSize:'22px'}}>{formatLocale('user.forget.title')}</span>
		  		<div>
		  			{ (progress === 'verification' || progress === 'findType') ? 
							(<span style={{color:'#999999'}}>Already have an account ?&nbsp;&nbsp;
								<Link style={{color:'#0099e8',textDecoration:'none'}} to='/user/login'>
                  {formatLocale('common.login')}
								</Link>
							</span>) :
		  				<Steps current={current[progress]} size="small" style={{ width: '460px'}}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title}/>
                ))}
              </Steps> 
						}
		  		</div>
		  	</div>
		  	<div className="forget-box__content">
          <div className="forget-form">
            {
              progress === 'verification' && (
                <div style={{width: '460px'}}>
                  <Sheet
                   labelCol={0}
                    wrapperCol={24}
                    columns={FORGET_PASSWORD} 
                    wrappedComponentRef={ref => this.verificationRef = ref}
                  />
                  <Button 
                    loading={effects['forgetPassword/forgetCheck']}
                    onClick={this.verificationSubmit} 
                    className="forget-btn"
                  >
                    {formatLocale('common.next')}
                  </Button>
                </div>
              )
            }
            {
              progress === 'verificationEmail' && (
                <div className="forget-form" style={{flexDirection: 'column', alignItems: 'center'}}>
                  <div>
                    <i className="icon iconfont icon-check-circle-o" style={{color: '#3dbd7d', fontSize:'48px'}}/>
                  </div>
                  <div>
                    <span style={{color:'#3dbd7d', fontSize:'36px'}}>
                    {formatLocale('user.forget.vEmail.1')}
                    </span>
                  </div>
                  <div>
                    <span style={{color:'#999', fontSize:'12px'}}>
                    {formatLocale('user.forget.vEmail.2')} {email}.&nbsp;&nbsp;
                    {formatLocale('user.forget.vEmail.3')}
                    </span>
                  </div>
                  <div style={{margin:'25px 0 20px 0'}}></div>
                  <span style={{fontSize:'16px',color:'#444'}}>
                    {formatLocale('user.forget.vEmail.4')} 
                  </span>
                </div>
              )
            }
            {
              progress === 'passwordReset' && (
                <div style={{width: '460px'}}>
                  <Sheet
                    labelCol={8}
                    columns={PASSWORD_COLUMN} 
                    wrappedComponentRef={ref => this.passwordResetRef = ref}
                  />
                  <Button 
                    loading={effects['forgetPassword/updatePasswordByEmail']} 
                    onClick={this.passwordResetSubmit} 
                    className="forget-btn"
                  >
                  {formatLocale('user.forget.btn.ok')}
                  </Button>
                </div>
              )
            }
            {
              progress === 'finished' && (
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <div>
                    <Icon style={{color:'#3dbd7d', fontSize:'48px'}} type="check-circle" />
                  </div>
                  <div>
                    <span style={{color:'#3dbd7d', fontSize:'36px'}}>
                    {formatLocale('user.forget.finished.1')}
                    </span>
                  </div>
                  <div>
                    <span style={{color:'#999', fontSize:'12px'}}>
                      {formatLocale('user.forget.finished.2')}
                    </span>
                  </div>
                  <div>
                    <Button onClick={() => this.goLogin()} className="forget-btn" style={{width: '380px', marginTop:'25px'}}>
                      {formatLocale('user.forget.btn.loginAgain')}
                    </Button>
                  </div>
                </div>
              )
            }
          </div>
		  	</div>
		  </div>
	  </div>
	 )
	}
}