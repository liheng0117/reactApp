import '@/styles/common.less'
// import './styles.less'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { formatLocale, _, qs } from '@/utils'
import router from 'umi/router'
import { COLUMNS, FILTER } from '@/constants/member'
import { Card, Table, Operation, Spin, Filtro } from '@/components'
export default
@connect(({ member, loading, app }) => {
  return {
    list: member.list,
    pagination: member.pagination,
    effects: loading.effects,
    scroll: app.scroll
  }
})
class extends PureComponent {
  onSubmit = options => {
    const { history, location } = this.props
    history.push({
      pathname: location.pathname,
      query: {
        current: 1,
        ...options
      }
    })
  }
  onAdd = () => {
    router.push('/admin/member/add')
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
  render() {
    const { list, effects, pagination, location, scroll } = this.props
    let query = qs.parse(location.search, { ignoreQueryPrefix: true })
    return (
      <Spin spinning={!!effects['member/fetch'] || !!effects['member/fetchUpdate']}>
        <div className="domain">
          <div id='table-other'>
          <Card title="Filter" bordered={false}>
            <Filtro
              columns={FILTER}
              onSubmit={this.onSubmit}  // 提交回调 || 表单切换回调
              value={query}
            />
          </Card>
          <Operation
            deploy={[
              { key: 'a1', name: formatLocale('member.add.title'), click: this.onAdd },
            ]}
          />
          </div>
          <Table
            className="common-table"
            columns={COLUMNS} 
            dataSource={list} 
            scroll={scroll}
            rowKey= {(item) => item.admin_id}
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