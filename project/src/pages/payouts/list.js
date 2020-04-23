import '@/styles/common.less'
import './styles.less'
import React, { PureComponent } from 'react'
import { Filtro, Card, Table, Spin } from '@/components'
import { Dialog } from '@/components'
import { connect } from 'dva'
import { qs, formatLocale } from '@/utils'
import { FILTER, COLUMNS } from '@/constants/payouts'

export default
@connect(({ payouts, loading }) => {
  return {
    tableBillData: payouts.tableBillData,
    tableData: payouts.tableData,
    tablePayoutsData: payouts.tablePayoutsData,
    tableDetailData: payouts.tableDetailData,
    pagination: payouts.pagination,
    effects: loading.effects,
  }
})
class extends PureComponent {
  state = {
    visible: false,
    type: null
  }

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
  onCancel = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  onClick = (event, record) => {
    const { dispatch } = this.props
    const test = event.target.innerText
    const { visible } = this.state
    event.stopPropagation()
    if(record.billing_type != 3){
      this.setState({
        visible: test === 'View' ? !visible : false,
        type: record.billing_type
      })
      dispatch({
        type: 'payouts/getDetail',
        payload: {billing_id: record.billing_id}
      })
    }
  }
  goDetail = (dataSource) => {
    const { type } = this.state
    const columns = COLUMNS[type]
    const common = [{ title: formatLocale('payouts.list.columns.ID'), dataIndex: 'offer_code' }]
    return(
      <Table
        columns={common.concat(columns)} 
        dataSource={dataSource} 
        rowKey= {item => item.offer_id}
        className="pop-payouts-bill"
      />
    )
  }
  render () {
    const { visible } = this.state
    const { tableData, tableDetailData, effects, location, pagination } = this.props
    let query = qs.parse(location.search, { ignoreQueryPrefix: true })
    return (
      <Spin spinning={!!effects['payouts/fetch']}>
      <div className="page-payouts">
        <Card title="Filter" bordered={false}>
          <Filtro
            columns={FILTER}
            onSubmit={this.onSubmit}  // 提交回调 || 表单切换回调
            value={query} // 表单默认值
          />
        </Card>

        <Table
          className="common-table"
          columns={COLUMNS.default} 
          dataSource={tableData} 
          rowKey= {(item) => item.billing_id}
          onChange={this.onTableChange}
          pagination={{
            ...pagination,
            pageSize: 20,
            showTotal: total => formatLocale('page.total', { total })
          }}
          onRow={record => {
            return {
              onClick: event => this.onClick(event, record),
            }
          }}
        />

        {/* Payouts Detail || Bill Detail */}
        <Dialog
          title={formatLocale('payouts.pop.BillDetail.Bonus')}
          visible={visible}
          onOk={this.onSubmit}
          onCancel={this.onCancel}
          bodyStyle={{padding: 24}}
          width={888}
          footer={null}
        >
          {/* { this.payoutsBill(tableBillData) } */}
          {/* 根据权限区分弹层 */}
          {/* { this.payoutsDetail(tablePayoutsData) } */}
          { this.goDetail(tableDetailData) }
        </Dialog>
      </div>
      </Spin>
    )
  }
}