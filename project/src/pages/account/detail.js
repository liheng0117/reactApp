import React, { PureComponent } from 'react'
import { connect } from 'dva'
import './styles.less'
import { formatLocale, _ } from '@/utils'
import { Sheet, Card, Row, Col, Dialog, Operation } from '@/components'
import { ACCOUNT_SHEET, PASSWORD_COLUMN, OR_PASSWORD_COLUMN } from '@/constants/user'
export default
@connect(({ loading, router, account, app }) => ({
  loading: loading.effects['account/updateAccount'],
  router,
  account,
  effects: loading.effects,
  app,
}))
class UserDetail extends PureComponent {
  onSubmit = () => {
    const { dispatch, account } = this.props
    const { editAccount } = account
    // if(editAccount){
      Promise.all([this.affiliateDetail.getResult(), this.userDetail.getResult(), this.zoneDetail.getResult()])
      .then(result => {
        dispatch({
          type: 'account/updateAccount',
          payload: {
            affiliate_detail: result[0],
            user_detail: result[1],
            ...result[2],
          }
        })
      })
    // }else{
    //   dispatch({ type: 'account/updateState', payload: { editAccount: true } })
    // }
  }
  onAffiliateChange = (allValues, changedValues) => {
    const { dispatch } = this.props
    dispatch({ type: 'account/updateState', payload: { affiliate_detail: allValues } })
  }
  onUserChange = (allValues, changedValues) => {
    const { dispatch } = this.props
    dispatch({ type: 'account/updateState', payload: { user_detail: allValues } })
  }
  onZoneChange = (allValues, changedValues) => {
    const { dispatch } = this.props
    dispatch({ type: 'account/updateState', payload: { timezone_id: allValues.timezone_id } })
  }
  modalOk = () => {
    const { dispatch } = this.props
    this.modalform.getResult()
    .then(result => {
      dispatch({ type: 'account/passwordChange', payload: result })
    })
  }
  modalShow = () => {
    const { dispatch, account} = this.props
    const { modalVisbile } = account
    dispatch({ type: 'account/updateState', payload: { modalVisbile: !modalVisbile } })
  }
  render() {
    const { editAccount, user_detail, affiliate_detail, timezone_id, modalVisbile } = this.props.account
    const { effects } = this.props
    const changepassword = [{ 
      label: 'Password',
      id: 'changepassword', 
      type: 'Button', 
      props:{
        onClick: this.modalShow,
        children: formatLocale('common.changePassword')
      }
    }]
    return(
      <div className="account-tabs">
        <Dialog
          title={formatLocale('common.changePassword')}
          visible={modalVisbile}
          onOk={this.modalOk}
          onCancel={this.modalShow}
          cancelText={formatLocale('common.save')}
          loading={effects['account/passwordChange']}
          centered
          width={600}
        >
         <Sheet
            columns={OR_PASSWORD_COLUMN.concat(PASSWORD_COLUMN)} 
            wrappedComponentRef={ref => this.modalform = ref}
          />
        </Dialog>
        <Row>
          <Card
            none-bordered="head"
            title={formatLocale('user.register.detail_account')} 
          >
            <Col span={14}>
              <Sheet
                value={affiliate_detail}
                disabled={!editAccount}
                columns={ACCOUNT_SHEET.AFFILIATE} 
                onChange={this.onAffiliateChange}
                wrappedComponentRef={ref => this.affiliateDetail = ref}
              />
            </Col>
          </Card>
        </Row>
        <Row>
          <Card
            none-bordered="head"
            data-margin="top"
            title={formatLocale('user.register.detail_user')} 
          >
            <Col span={14}> 
              <Sheet
                value={user_detail}
                disabled={!editAccount}
                onChange={this.onUserChange}
                columns={ACCOUNT_SHEET.USER} 
                wrappedComponentRef={ref => this.userDetail = ref}
              />
              <Sheet
                columns={changepassword} 
              />
            </Col>
          </Card>
        </Row>
        <Row>
          <Card
            none-bordered="head"
            data-margin="top"
            title={formatLocale('user.register.detail_timezone')} 
          >
            <Col span={14}> 
              <Sheet
                value={{ timezone_id: timezone_id }}
                disabled={!editAccount}
                onChange={this.onZoneChange}
                columns={ACCOUNT_SHEET.TIMEZONE} 
                wrappedComponentRef={ref => this.zoneDetail = ref}
              />
            </Col>
          </Card>
        </Row>
        <Row>
          <Col span={16} offset={8}>
            <Operation 
              deploy={[
                { 
                  name: formatLocale('common.edit') , 
                  click: this.onSubmit,
                  loading: effects['account/updateAccount'] 
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
