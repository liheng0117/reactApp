import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { formatLocale, _ } from '@/utils'
import '@/styles/common.less'
import './styles.less'
import { Sheet, Button } from '@/components'
import PostBack from '@/components/PostBack'
import { FORM_GLOBAL } from '@/constants/postback'

const Demo = ({ label, children }) => {
  return (
    <div style={{ margin: '24px 0'}}>
      <div>{children}</div>
    </div>
  )
}

const PostbackParameters = () => {
  return <p className="textarea">
    {formatLocale('pastback.g.pk-param')}
    <span>{formatLocale('pastback.g.pk-replace')}</span>
  </p>
}

const dataSources2 = [
  {
    label: <PostbackParameters />,
    id: 'f',
    type: 'TextArea',
    props: {
      rows: 12,
      placeholder: `${formatLocale('pastback.g.pk-ph1')}
${formatLocale('pastback.g.pk-ph2')}
${formatLocale('pastback.g.pk-ph3')}
${formatLocale('pastback.g.pk-ph4')}
${formatLocale('pastback.g.pk-ph5')}
${formatLocale('pastback.g.pk-ph6')}
${formatLocale('pastback.g.pk-ph7')}
${formatLocale('pastback.g.pk-ph8')}`
    },
    disabled: true
  }, 
]

export default
@connect(({ loading, router, postback }) => ({
  effects: loading.effects,
  router,
  globalDetail: postback.globalDetail
}))
class extends PureComponent {
  onSubmit = () => {
    const { dispatch, globalDetail } = this.props
    this.formRef.getResult()
    .then(result => {
      const { global_pixel_flag, global_postback_flag, ...other } = result
      let obj = {
        global_pixel_flag: Number(global_pixel_flag),
        global_postback_flag: Number(global_postback_flag)
      }
      dispatch({
        type: 'postback/fetchSave_global',
        payload: { ...globalDetail,  ...obj, ...other }
      })
    })
    .catch(err => {
      console.log('错误的表单信息', err)
    })
  }
  onChange = (globalDetail, changedValues) => {
    const { dispatch } = this.props
    dispatch({ type: 'postback/updateState', payload: { globalDetail } })
  }
  render () {
    const { effects, globalDetail } = this.props
    const sheet = FORM_GLOBAL(globalDetail)
    const btn = {
      id: 'but',
      ignore: true,
      type: 'Button',
      props: {
        children: 'Save',
        onClick: this.onSubmit,
        type: 'primary'
      }
    }
    return (
      <div className="global-postback">
        <PostBack 
          value={globalDetail}
          extra={['lead_url', 'confirmed_url', 'lead_code']}
          ref={ref => this.formRef = ref }
          sheet={[...sheet, btn]} 
        />
        {/* <div className="left">
          <Demo label="合成表单组件">
            <Sheet
              columns={FORM_GLOBAL(globalDetail)}
              layout="vertical"
              wrappedComponentRef={ref => this.formRef = ref}
              value={globalDetail}
              onChange={this.onChange}
            />
            <Button type="primary" onClick={this.onSubmit} loading={effects['postback/fetchSave_global']}>
              {formatLocale('common.save')}
            </Button>
          </Demo>
        </div>
        <div className="right">
          <Demo label="合成表单组件">
            <Sheet
              value={{
                d: '16',
                h: [1, 2]
              }}
              disabled={['f']}
              columns={dataSources2}
              layout="vertical"
            />
          </Demo>
        </div> */}
      </div>
    )
  }
}
