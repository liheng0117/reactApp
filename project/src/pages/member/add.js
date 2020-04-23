import React, { PureComponent } from 'react'
import { connect } from 'dva'
import './styles.less'
import { _, formatLocale, tools } from '@/utils' 
import { Sheet, Operation, Col, Row, Dialog } from '@/components'
import { PASSWORD_COLUMN } from '@/constants/user'
import router from 'umi/router'
const { serializeOptions } = tools

export default
@connect(({ loading, router, member, cfgs }) => ({
  loading,
  router,
  member,
  cfgs
}))
class Register extends PureComponent {
  
  onSubmit = () => {
    const { dispatch, member } = this.props
    const { isEdit, detail } = member
    console.log(this.form.getResult())
    this.form.getResult()
    .then(result => {
      console.log('ss',result)
      const payload = isEdit ? {admin_id: detail.admin_id, ...result} : result
      dispatch({
        type: isEdit ? 'member/memberUpdate' : 'member/memberSave',
        payload: payload
      })
    })
    .catch(err => {
      console.log('错误的表单信息', err)
    })
  }
  onCancel = () => {
    router.push('/admin/member/')
  }
  modalOK = () => {
    const { dispatch, member } =this.props
    this.modalform.getResult()
    .then(result => {
      dispatch({
        type: 'member/memberPasswordReset',
        payload: { ...result, email: member.detail.email }
      })
    })
    .catch(err => {
      console.log('错误的表单信息', err)
    })
  }
  modalShow = () => {
    const { member, dispatch } =this.props
    dispatch({
      type: 'member/updateData',
      payload: {visible: !member.visible}
    })
  }
  render() {
    const { loading, cfgs } = this.props
    const { isEdit, detail, visible } =this.props.member
    // console.log(PASSWORD_COLUMN[0])
    const AFFILIATE_STATUS = _.get(cfgs, 'affiliate_status', {})
    const ROLE = _.get(cfgs, 'role', {})
    const editColumns = [
      { 
        label:  formatLocale('user.register.label_email'),
        id: 'email', 
        type: isEdit ? 'Text' : 'Input', 
        verify: isEdit ? false : ['email',  formatLocale('common.invalidEmail')],
        required: isEdit ? false : formatLocale('common.enterEmail'), 
        props: {
          children: isEdit ? detail.email : null
        }
      },
      Object.assign(_.cloneDeep(PASSWORD_COLUMN[0]), {
        type: isEdit ? 'Button' : 'Input', 
        required: isEdit ? false : formatLocale('common.enterPassword'),
        props: {
          onClick: isEdit ? this.modalShow : () => {},
          type: 'password',
          children: isEdit ? 'change password' : null
        }
      }),
      { 
        label:  formatLocale('user.register.label_phone'),
        id: 'phone', 
        type: 'Input', 
        required:  formatLocale('user.register.enterPhone'), 
      },
      { 
        label:  formatLocale('member.list.columns.role'),
        id: 'role_id', 
        type: 'Select', 
        required:  formatLocale('member.add.enterRole'), 
        option: serializeOptions(ROLE),
      },
      { 
        label:  formatLocale('member.list.columns.status'),
        id: 'admin_status', 
        type: 'Select', 
        required:  formatLocale('member.add.enterStatus'), 
        option: serializeOptions(AFFILIATE_STATUS),
      }, 
    ]
    let addColumns = _.cloneDeep(editColumns)
    addColumns.splice(2, 0, PASSWORD_COLUMN[1])
    return (
      <div className='member-form-box'>
        <Dialog
          title={ formatLocale('common.changePassword')}
          visible={visible}
          onOk={this.modalOK}
          width={600}
          onCancel={this.modalShow}
          cancelText={ formatLocale('common.save')}
          loading={loading.effects['member/memberPasswordReset']}
          centered
        >
          <Sheet
            columns={PASSWORD_COLUMN} 
            wrappedComponentRef={ref => this.modalform = ref}
          />
        </Dialog>
        {
          isEdit && (
            <Sheet
              labelCol={4}
              wrapperCol={8}
              columns={[editColumns[0],editColumns[1]]} 
            />
          )
        }
        <Sheet
          value={detail}
          labelCol={4}
          wrapperCol={8}
          columns={isEdit ? editColumns.slice(2) : addColumns} 
          wrappedComponentRef={ref => this.form = ref}
        />
        <Row>
          <Col span={16} offset={4}>
            <Operation 
              deploy={[
                { 
                  name:  formatLocale('common.save'), 
                  click: this.onSubmit, 
                  loading: loading.effects['member/memberUpdate'] || loading.effects['member/memberSave']
                },
                { name: formatLocale('common.cancel'), type: 'default', click: this.onCancel, }
              ]}
            />
          </Col>
        </Row>
      </div>
    )
  }
}