import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'
import { qs, uuid, is, formatLocale } from '@/utils'
import { Card, Table, Filtro, Operation, Dialog, Sheet } from '@/components'
import { CREATIVE_SHEET } from '@/constants/offer'
export default
@connect(({ app, offers, loading }) => ({
  app, 
  classes: offers.classes,
  loading: !!loading.effects['offers/fetchList'] || !!loading.effects['offers/fetchBatchOffers'],
  data: offers
}))
class extends PureComponent {

  constructor(props) {
    super(props) 
  }
  onChange = (key) => {
    const { history } = this.props
    history.push(key)
  }
  // 操作按钮处理逻辑
  onOperation = (key) => {
    const { history, dispatch } = this.props
    switch (key) {
      case 'create-offer':
        history.push('/admin/offer/create')
        break
      case 'pending-offer': 
        dispatch({ 
          type: 'offers/fetchBatchOffers',
          payload: { offer_status: 0 }
        })
        break
      case 'add-creative':
          dispatch({ 
            type: 'offers/updateState', 
            payload: { creative: {} } 
          })   
          break
      default:
        break
    }
  }
  // offer弹框的显示与关闭
  onCancel = () => {
    const { dispatch } = this.props
    dispatch({ type: 'offers/updateState', payload: { creative: null } })    
  }
  onOk = async () => {
    const { dispatch } = this.props
    let data = await this.formRef.getResult()
    console.log('creative 数据-1', data)
    dispatch({
      type: 'offers/fetchCreativeSave',
      payload: data
    })
  }
  onTableChange = (pagination, filters, { field, order }) => {
    const { history, location } = this.props
    let { current } = pagination
    let order_by = field && { field, order: order.replace('end', '') }
    let params =  qs.parse(location.search, { ignoreQueryPrefix: true }) 
    params = { ...params, current, order_by }
    let search = qs.stringify(params, { addQueryPrefix: true })
    history.push(`${location.pathname}${search}`)
  }
  onSelectionChange = (selectedRowKeys) => {
    const { dispatch } = this.props
    dispatch({ type: 'offers/updateState', payload: { selectedRowKeys } })
  }
  onSubmit = (params) => {
    console.log(params)
    const { history, location } = this.props
    history.push({
      pathname: location.pathname,
      query: {
        current: 1,
        ...params
      }
    })
  }
  render() {
    const { loading, data, location, classes, app }= this.props
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    const rowSelection = classes !== 'list' ? null : {
      type: 'checkbox',
      selectedRowKeys: data.selectedRowKeys,
      onChange: this.onSelectionChange,
      getCheckboxProps: (record) => ({
        disabled: record.offer_status !== 1
      })  
    }
    const dialogProps = is.empty(data.creative) ? {
      title: 'Add Creatives'
    } : {
      title: 'Createtive Detail',
      footer: null
    }
    return (
      <>
        <Card>
          <Filtro 
            value={params} 
            columns={data.filter}
            onSubmit={this.onSubmit}
          />
        </Card>
        <Operation deploy={data.operation} onClick={this.onOperation}/>
        <Card>
          <Table
            rowKey={classes === 'creatives' ? 'creative_id' : 'offer_id'}
            scroll={app.scroll}
            dataSource={data.list} 
            columns={data.columns}
            onChange={this.onTableChange}
            pagination={{
              ...data.pagination,
              pageSize: 20,
              showTotal: total => formatLocale('page.total', { total })
            }}
            rowSelection={rowSelection}
            loading={loading}
          />
        </Card>
        {
          classes === 'creatives' && (
            <Dialog
              visible={!!data.creative}
              onCancel={this.onCancel}
              onOk={this.onOk}
              {...dialogProps}
              centered
            >
            <Sheet
                value={data.creative || {}}
                labelCol={4}
                wrapperCol={18}
                disabled={!is.empty(data.creative)}
                columns={CREATIVE_SHEET}
                wrappedComponentRef={ref => this.formRef = ref}
            />
            </Dialog>
          )
        }
      </>
    )
  }
}
