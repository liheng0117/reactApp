import './styles.less'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { formatLocale, decorator } from '@/utils'
import { Card, Sheet, Icon, Operation, Input, Row, Col } from '@/components'

import OfferPages from './offer_pages'
export default
@connect(({ app, offer, loading }) => ({
  loading: !!loading.effects['offer/fetchUpdate'],
  platform: app.platform,
  data: offer[app.platform]
}))
class extends PureComponent {
  onPageChange = (index, rest) => {
    const { dispatch, platform } = this.props
    const payload = { rest, index }
    dispatch({ type: 'offer/doModifyPage', payload })
  }
  onAddPage = (index, rest) => {
    const { dispatch } = this.props
    let payload = { rest, index }
    dispatch({ type: 'offer/doAddPage', payload })
  }
  onSheetChange = (basic) => {
    const { dispatch, platform, data } = this.props
    let payload = { basic: { ...data.basic, ...basic }}
    let sheet = data.sheet.map(item => item.id !== 'description' ? {
      ...item,
      required: basic.offer_status === '1' ? `this ${item.label} cannot be empty` : false
    } : item)
    payload.sheet = sheet
    dispatch({ type: 'offer/updateState', platform, payload })
  }
  onSubmit = async () => {
    const { dispatch, data } = this.props
    const { offer_id } = data.basic
    let basic_info = await this.formRef.getResult()
    let offer_page = await this.pageRef.getResult()
    offer_page = offer_page.reduce((pre, next) => {
      return !next.offer_page_id && next.is_delete === 1 ? pre : [...pre, next]
    }, [])
    let payload = { basic_info: {...basic_info, offer_id}, offer_page }
    dispatch({ type: 'offer/fetchUpdate', payload })
  }
  onEdit = () => {
    const { history, location } = this.props
    history.replace(`${location.pathname}/edit`)
  }
  render() {
    const { data, match, loading}= this.props
    const { params, url } = match
    const disabled = params.offer_id
    const deploy = [
      { 
        name: params.offer_id ? 'Save' : formatLocale('offer.add.button.submit'), 
        loading: loading,
        click: this.onSubmit 
      }, { 
        name: formatLocale('offer.add.button.cancel'), 
        type: 'default'
      }
    ]
    return (
      <>
       <Card title="Basic Information" none-bordered="head">
          <Sheet
            labelCol={4}
            wrapperCol={8}
            value={data.basic}
            onRender={id => params.offer_id ? true : id !== 'offer_code'}
            // hidden={ && ['offer_code']}
            columns={data.sheet}
            onChange={this.onSheetChange}
            wrappedComponentRef={ref => this.formRef = ref}
          />
       </Card>
       <Card title="Offer page" none-bordered="head" data-margin="top">
          <OfferPages 
            dataSources={data.pages}
            wrappedComponentRef={ref => this.pageRef = ref}
          />
       </Card>
       <Operation 
          justify="center"
          deploy={deploy}
        />
      </>
    )
  }
}