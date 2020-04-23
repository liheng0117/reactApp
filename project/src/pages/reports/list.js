import '@/styles/common.less'
import './styles.less'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { uuid, qs, formatLocale, _ } from '@/utils'
import { Card, Table, Operation, MultiSelect, Filtro, Spin, message, Tooltip } from '@/components'
import BonusModal from './bonusModal'
import BillingModal from './billingModal'
import { multiOptionFilter } from '@/constants/reports'
import { array } from 'prop-types';


export default
@connect(({ reports, loading, app }) => {
  return {
    cfgs: app.cfgs,
    loading: !!loading.effects['reports/fetch'],
    data: reports,
    scroll: app.scroll,
    effects: loading.effects
  }
})
class extends PureComponent {
  constructor (props) {
    super(props)
    this.pathname = window.location.pathname
  }

  onSubmit = (params) => {
    const { history, location } = this.props
    const payload = {
      page: 1,
      ...params,
    }
    history.push({
      pathname: location.pathname,
      search: `?${qs.stringify(payload)}`
    })
  }
  onTableChange = (pagination, filters, { field, order }) => {
    const { history, location } = this.props
    let { current } = pagination
    let order_by = field && { field, order: order.replace('end', '') }
    let params =  qs.parse(location.search, { ignoreQueryPrefix: true }) 
    params = { ...params, page: current, order_by }
    let search = qs.stringify(params, { addQueryPrefix: true })
    history.push(`${location.pathname}${search}`)
  }
  download = () => {
    const { dispatch, location } = this.props
    let params =  qs.parse(location.search, { ignoreQueryPrefix: true })
    dispatch({ type: 'reports/download', payload: {request_action: 'download', ...params} } )
  }
  onOk = payload => {
    const { dispatch } = this.props
    dispatch({ type: 'reports/filterData', payload } )
  }
  onCloumnsChange = (value, ok) => {
    const { dispatch } = this.props
    dispatch({ type: 'reports/doCloumns', payload: value })
    if(ok){
      let group_by = []
      Object.keys(multiOptionFilter).map(k => {
        value.includes(k) && group_by.push(multiOptionFilter[k])
      })
      const { history, location } = this.props
      let params =  qs.parse(location.search, { ignoreQueryPrefix: true }) 
      params = { ...params, page: 1, group_by }
      let search = qs.stringify(params, { addQueryPrefix: true })
      dispatch({ type: 'reports/updateState', payload: { group_by } })
      history.push(`${location.pathname}${search}`)
    }
  }
  modalCancel = () => {
    this.props.dispatch({ type: 'reports/updateState', payload: {visible: false, selectedRowKeys: []} })
  }
  modalOk = params => {
    const { dispatch } = this.props
    dispatch({ type: 'reports/add', payload: params })
  }
  onSelectRow = (keys) => {
    const { dispatch } = this.props
    dispatch({ type: 'reports/updateState', payload: {selectedRowKeys: keys} })
  }
  render () {
    const { loading, location, data, platform, scroll, effects } = this.props
    const { visible, classes, buttonlist, selectedRowKeys, 
      order_bonus_extro, billing_detail,  multiValuesClone, columnsClone
    } = data
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    const columns = data.classes === 'summary' ? 
    data.columns.length ? data.columns.filter(d => ('_visible' in d && d._visible)) : columnsClone.filter(d => ('_visible' in d && d._visible)) 
    : data.columns
    
    const BonusModalProps = {
      visible, 
      order_bonus_extro,
      classes, 
      modalCancel: this.modalCancel,
      modalOk: this.modalOk
    }
    const BillingModalProps = {
      visible, 
      effects,
      billing_detail: billing_detail ? billing_detail : {},
      modalCancel: this.modalCancel,
      modalOk: this.modalOk
    }
    const CardTitle = (
      <Tooltip 
        placement="topLeft" 
        title="The selected fields are displayed in the list"
      >
        Option&nbsp;<i className='iconfont icon-question-circle-o'/>
      </Tooltip>
    )
    return (
      <Spin spinning={loading}>
      <div className="report">
        <Card title="Filter" bordered={false}>
          <Filtro
            value={params}
            columns={data.filter}
            onSubmit={this.onSubmit}
          />
        </Card>
        {
          data.classes === 'summary' && (
            
            <Card title={CardTitle} className="multiSelect">
              <MultiSelect
                placeholder="Options"
                title="Select date to Include"
                option={data.multiOption}
                value={data.multiValues.length ? data.multiValues : multiValuesClone}
                onChange={this.onCloumnsChange}
              />
            </Card>
          )
        }
        <Operation
          deploy={[
            { key: 'a1', name: 'download', click: this.download },
          ].concat(buttonlist)}
        />
        <Table 
          className="common-table"
          columns={columns}
          dataSource={data.list}
          scroll={{x: 1620}}
          rowKey= {(item, index) => index}
          onChange={this.onTableChange}
          pagination={{
            ...data.pagination,
            pageSize: 20,
            showTotal: total => formatLocale('page.total', { total })
          }}
          rowSelection={
            platform === 'frontend' || data.classes === 'summary' ? null : 
            {
              type: 'checkbox',
              onChange: this.onSelectRow,
              selectedRowKeys: selectedRowKeys,
              // getCheckboxProps: v => {
              //   let order = (v.order_status !== 1 || v.billing_code) ? true : false
              //   let bonus = v.billing_code ? true : false
              //   return ({
              //     disabled: data.classes === 'order' ? order : bonus
              //   }) 
              // }
            }
          }
        />
      </div>
      <BonusModal {...BonusModalProps}/>
      <BillingModal {...BillingModalProps}/>
      </Spin>
    )
  }
}
