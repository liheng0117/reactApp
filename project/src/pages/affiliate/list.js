import '@/styles/common.less'
import './styles.less'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Filtro, Card, Table, Operation, Button, message, Badge } from '@/components'
import { qs, motor, _, numeral } from '@/utils'
import { ORDER } from '@/constants'
import { Con } from '@/constants/affiliate'

export default
@connect(({ affiliate, app, loading }) => {
  return {
    app,
    tableData: affiliate.tableData,
    filter: affiliate.filter,
    batchStatus: affiliate.batchStatus,
    total: affiliate.total,
    current: affiliate.current,
    pageSize: affiliate.pageSize,
    loading: !!loading.effects['affiliate/doList'],
  }
})
class extends PureComponent {
  constructor (props) {
    super(props)
    this.statusText = {
      Rejected: 'error',
      Pending: 'processing',
      Approved: 'success',
    }
  }

  onAdd = () => {
    let { history } = this.props
    history.push(`/admin/affiliates/add`)
  }

  onPending = () => {
    const { dispatch, batchStatus } = this.props
    const { selectedRowKeys, selectedRows } = batchStatus
    const isTrue = selectedRows.some(rows => !rows.affiliate_status)

    if (!selectedRowKeys.length) {
      message.warning('Please select the checkbox in front and click again.')
      return false
    }

    if (isTrue) {
      message.warning('Can only be imposed on the affiliate with the status approved')
      return false
    }

    dispatch({
      type: 'affiliate/doBatchStatus',
      payload: {
        aff_id_arr: selectedRowKeys,
        affiliate_status: 0,
      }
    })
  }

  onSubmit = options => {
    // const { history } = this.props
    // const search = qs.stringify(options, { addQueryPrefix: true })
    // console.log( search )
    const { history, location } = this.props
    history.push({
      pathname: location.pathname,
      query: {
        page: 1,
        ...options
      }
    })
    // history.push(`${history.location.pathname}${search}`)
  }

  // 分页 || 排序 
  onChange = ({ current, pageSize }, filters, { field, order }) => {
    const { dispatch, history, location } = this.props
    let payload = { page: current, pageSize }
    let params = qs.parse(history.location.search, { ignoreQueryPrefix: true }) 
    let order_by = { field, order: ORDER[order] }
    
    // field 有值表示 表头排序 添加额外分页参数
    // if ( field ) {
      params = { ...params, page: current, order_by }
      let search = qs.stringify(params, { addQueryPrefix: true })
      history.push(`${history.location.pathname}${search}`)
    //   return false
    // }

    // setTimeout(() => dispatch({ type: 'affiliate/doList', payload }), 0)
  }

  // 编辑表单
  onView = ({ affiliate_id }) => {
    const { history } = this.props
    history.push(`/admin/affiliates/${affiliate_id}/edit`)
  }

  onCheckboxChange = (selectedRowKeys, selectedRows) => {
    const { dispatch } = this.props
    dispatch({
      type: 'affiliate/updateBatchStatus',
      payload: {
        batchStatus: {
          selectedRowKeys,
          selectedRows,
        }
      }
    })
  }

  getCheckboxProps = record => ({
    disabled: record.affiliate_status === 'Disabled User',
    name: record.name,
  })

  render() {
    const { tableData, filter, history, current, total, pageSize, loading, app } = this.props

    const columns = [
      { title: Con.affiliateID, dataIndex: 'affiliate_id', sorter: true, render: (v, all) => _.get(all, 'affiliate_code', '') },
      { title: Con.affiiiate, dataIndex: 'affiliate_name', sorter: true },
      { title: Con.accountManager, dataIndex: 'manager_email', sorter: true },
      { title: Con.clicks, dataIndex: 'clicks', sorter: true },
      { title: Con.orders, dataIndex: 'orders', sorter: true },
      { title: Con.clickToOrderRate, dataIndex: 'conversion_click_rate', sorter: true,
        render: v => numeral(v).format('%')
      },
      { title: Con.ConversionsConfirmedOrder, dataIndex: 'conversion_order_rate', sorter: true,
        render: v => numeral(v).format('0,0')
      },
      { title: Con.Revenue, dataIndex: 'revenue', sorter: true,
        render: v => numeral(v).format('$0,0.00')
      },
      { title: Con.repeatOrders, dataIndex: 'repeat_orders', sorter: true },
      { title: Con.bonus, dataIndex: 'repeat_orders_bonus', sorter: true,
        render: v => numeral(v).format('$0,0.00')
      },
      { title: Con.totalRevenue, dataIndex: 'total_revenue', sorter: true,
        render: v => numeral(v).format('$0,0.00')
      },
      { title: Con.source, dataIndex: 'source', sorter: true, render: v => motor(v).format('affiliate_source') },
      {
        title: Con.status,
        dataIndex: 'affiliate_status',
        sorter: true,
        render: v => {
          const text = motor(v).format('affiliate_status')
          // console.log( this.statusText[text] )
          return <Badge status={this.statusText[text]} text={text} />
        },
      },
      {
        title: Con.actions,
        dataIndex: 'actions',
        // fixed: 'right',
        render: (text, ops) => <Button type="link" onClick={() => this.onView(ops)}>{Con.actions}</Button>,
      },
    ]

    return (
      <div className="affiliate">
        <Card title="Filter" bordered={false}>
          <Filtro
            value={history.location.query}
            columns={filter}
            onSubmit={this.onSubmit}
          />
        </Card>

        <Operation
          deploy={[
            { key: 'a1', name: Con.addAffiliate, click: this.onAdd },
            { key: 'a2', name: Con.pendingAffiliate, click: this.onPending },
          ]}
        />

        <Table
          className="common-table"
          columns={columns} 
          dataSource={tableData}
          scroll={{ x: 1300 }}
          onChange={this.onChange}
          pagination={{total, pageSize: +pageSize, current}}
          rowSelection={{
            onChange: this.onCheckboxChange,
          }}
          rowKey= {dt => dt.affiliate_id}
          loading={loading}
        />
      </div>
    )
  }
}
