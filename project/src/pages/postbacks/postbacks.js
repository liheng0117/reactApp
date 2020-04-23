import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { qs, formatLocale } from '@/utils'
import PropTypes from 'prop-types'
import { Filtro, Card, Table, Spin, Modal } from '@/components'
import { COLUMNS, FILTER } from '@/constants/postback'
import './styles.less'
const confirm = Modal.confirm

export default
@connect(({ postback, app, loading }) => {
  return {
    postback,
    effects: loading.effects,
    app
  }
})
class extends PureComponent {
  static contextTypes = {
    scrollXY: PropTypes.any
  }
  onSubmit = options => {
    const { history, location } = this.props
    let payload = { ...options, page: 1 }
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
  onDelete = (record) => {
    const { dispatch } = this.props
    confirm({
      title: `Confirm Delete?`,
      prefixCls: 'nwd-modal',
      okButtonProps: {
        prefixCls: 'nwd-btn',
      },
      cancelButtonProps: {
        prefixCls: 'nwd-btn',
      },
      onOk () {
        dispatch({ type: 'postback/fetchDelete', payload: { record }})
      },
    })
  }
  render () {
    const { location, effects, postback, app } = this.props
    const { list, pagination } = postback
    let query = qs.parse(location.search, { ignoreQueryPrefix: true })
    const columns =  COLUMNS.default.concat([{ 
      title: formatLocale('common.actions'), 
      key: 'action', 
      width: 200,
      render: record => <span className='pastback-action' onClick={() => this.onDelete(record)}>{formatLocale('common.delete')}</span>
    },
  ])
    return (
      <Spin spinning={!!effects['postback/fetch'] || !!effects['postback/fetchUpdate']} >
        <div className="postbacks">
          <Card title="Filter" bordered={false}>
            <Filtro
              columns={FILTER}
              onSubmit={this.onSubmit}  // 提交回调 || 表单切换回调
              value={query}
            />
          </Card>

          <Table
            className="common-table"
            scroll={app.scroll}
            columns={columns} 
            dataSource={list} 
            rowKey= {(item) => item.postback_id}
            onChange={this.onTableChange}
            pagination={{
              ...pagination,
              showTotal: total => `Total ${total} items，${pagination.pageSize} per page`
            }}
          />
        </div>
      </Spin>
    )
  }
}
