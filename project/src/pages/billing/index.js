import '@/styles/common.less'
import './styles.less'
import React, { PureComponent } from 'react'
import { formatLocale, _, qs } from '@/utils'
import { connect } from 'dva'
import { Card, Table, Operation, Modal, Spin, Filtro } from '@/components'
import { DEFAULT_COM, FILTER } from '@/constants/billing'
import Detail from './detail'
const confirm = Modal.confirm

export default
@connect(({ billing, loading, app }) => {
  return {
    billing,
    effects: loading.effects,
    scroll: app.scroll
  }
})
class extends PureComponent {
  onSubmit = options => {
    const { history, location } = this.props
    history.push({
      pathname: location.pathname,
      search: `?${qs.stringify(options)}`
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
  onChangeStatus = (billing_status) => {
    const { dispatch } = this.props
    dispatch({ type: 'billing/billingStatus', payload: { billing_status } })
  }
  downLoad = () => {
    const { dispatch, location } = this.props
    let params =  qs.parse(location.search, { ignoreQueryPrefix: true })
    console.log(params)
    dispatch({ type: 'billing/download', payload: {request_action: 'download', ...params} } )
  }
  onSelect = (keys) => {
    const { dispatch } = this.props
    dispatch({ type: 'billing/updateState', payload: {selectedRowKeys: keys} })
  }
  onEdit = (record) => {
    const { dispatch } = this.props
    dispatch({ type: 'billing/updateState', payload: { visible: true } })
    dispatch({ type: 'billing/fetchDetail', payload: { billing_id: record.billing_id } })
  }
  onDelete = (record) => {
    const { dispatch } = this.props
    confirm({
      title: `${formatLocale('billing.delete.confirm1')}${record.billing_code}${formatLocale('billing.delete.confirm2')}`,
      prefixCls: 'nwd-modal',
      okButtonProps: {
        prefixCls: 'nwd-btn',
      },
      cancelButtonProps: {
        prefixCls: 'nwd-btn',
      },
      onOk () {
        dispatch({ type: 'billing/fetchDelete', payload: { billing_id: record.billing_id}})
      },
    })
  }
  modalCancel = () => {
    const { dispatch } = this.props
    dispatch({ type: 'billing/updateState', payload: { visible: false, detail: {} } })
  }
  modalOk = data => {
    const { dispatch, billing } = this.props
    const { period_time, memo } = data
    const payload = {
      billing_id: billing.detail.billing_id,
      memo,
      date: period_time
    }
    dispatch({ type: 'billing/fetchUpdate', payload: payload })
  }
  render() {
    const { effects, billing, location, scroll } = this.props
    let query = qs.parse(location.search, { ignoreQueryPrefix: true })
    const { list, selectedRowKeys, visible, detail, pagination } = billing
    const columns = DEFAULT_COM.concat([{ 
        title: formatLocale('billing.columns.action'), 
        key: 'action', 
        render: (record) => {
          return(
            <div className="billing-aciton">
              <span onClick={() => this.onEdit(record)}>{formatLocale('billing.action.detail')}</span>
              <span 
                onClick={() => this.onDelete(record)} 
                data-status={record.paid_status === 'cancelled'}
              >
                {formatLocale('billing.action.delete')}
              </span>
            </div>
          )
        }
      },
    ])
    const detailProps={
      visible,
      detail,
      modalCancel: this.modalCancel,
      modalOk: this.modalOk,
    }
    const _this = this
    return (
      <Spin spinning={!!effects['billing/fetch'] || !!effects['billing/billingStatus']}>
        <div className="billing">
          <Card title="Filter" bordered={false}>
            <Filtro
              columns={FILTER}
              onSubmit={this.onSubmit}  // 提交回调 || 表单切换回调'
              value={query} // 表单默认值
            />
          </Card>
          <Operation
            deploy={[
              { key: 'a1', name: formatLocale('billing.operation.pay'), click: () => this.onChangeStatus(1) },
              { key: 'a2', name: formatLocale('billing.operation.cancel'), click: () => this.onChangeStatus(-1) },
              { key: 'a3', name: formatLocale('billing.operation.down'), click: this.downLoad },
            ]}
          />
          <Table
            className="common-table"
            columns={columns} 
            dataSource={list} 
            scroll={scroll}
            rowKey= {(item, k) => k}
            onChange={this.onTableChange}
            pagination={{
              ...pagination,
              showTotal: total => `Total ${total} items，${pagination.pageSize} per page`
            }}
            rowSelection={{
              type: 'checkbox',
              onChange: this.onSelect,
              selectedRowKeys: selectedRowKeys
            }}
          />
          <Detail {...detailProps}/>
        </div>
      </Spin>
    )
  }
}