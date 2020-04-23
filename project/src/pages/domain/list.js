import '@/styles/common.less'
import './styles.less'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Filtro, Card, Table, Operation, Switch, Dialog, Sheet, Button } from '@/components'
import { ORDER } from '@/constants'
import { Con, backendCon, FILTER } from '@/constants/domain'
import { _, date, qs, moment } from '@/utils'

const CONFIG = {
  doData: 'domain/doData',
  doUpdateStatus: 'domain/doUpdateStatus',
  domainType: 'domain_type',
  domainId: 'domain_id',
  domainUrl: 'domain_url',
  // affiliateId: 'affiliate_code',
  affiliateId: 'affiliate_id',
  offerName: 'offer_name',
  updateDomainForms: 'domain/updateDomainForms',
  doSubmit: 'domain/doSubmit',
  updateEdit: 'domain/updateEdit',
  domainStatus: 'domain_status',
  createTime: 'create_time',
  affiliateName: 'affiliate_name',
  domainCode: 'domain_code',
  Edit: 'Edit',
}

export default
@connect(({ domain, app, loading, cfgs }) => {
  return {
    cfgs,
    platform: app.platform,
    tableData: domain.tableData,  // 表格数据
    filter: domain.filter,
    loading: !!loading.effects[CONFIG.doData] || !!loading.effects[CONFIG.doUpdateStatus],
    pageSize: domain.pageSize,
    total: domain.total,
    current: domain.current,
    popData: domain.popData,
    popDetail: domain.popDetail,
    disabledArr: domain.disabledArr,
    isEdit: domain.isEdit,
    app,
  }
})
class extends PureComponent {
  state = {
    visible: false,
  }

  // Pop 弹层逻辑
  onPopChange = (op0, op1) => {
    const { dispatch } = this.props

    if (CONFIG.domainType in op1) {
      dispatch({
        type: CONFIG.updateDomainForms,
        payload: {
          option: op1, 
          all: op0,
          isTrue: !!+op1.domain_type,
        }
      })
    }
  }
  
  // 提交查询
  onSubmit = options => {
    const { history } = this.props

    // keyword 带入搜索框
    history.push({
      pathname: history.location.pathname,
      current: 1,
      query: options
    })
  }

  // 添加数据
  onCreateData = () => {
    const { dispatch, popDetail } = this.props
    const { domain_id, id } = popDetail
    this.domainOpon.getResult()
      .then(result => {
        // 提交时需要把 offer_id 转换回来
        // 又触发新的 offer_id 不需要重置
        if (window.g_platform === 'frontend') {
          if (domain_id && isNaN(+result.offer_id)) {
            result.offer_id = id
          }
        } else {
          if (domain_id && isNaN(+result.affiliate_id)) {
            result.affiliate_id = id
          }
        }
        
        dispatch({
          type: CONFIG.doSubmit,
          // domain_id 编辑时 需要使用 domain_id 创建时不用 domain_id
          payload: { ...result, domain_id: domain_id },
        })
        this.setPopVisible()
      })
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
      // return false
    // }

    // history.push({
    //   pathname: location.pathname,
    //   query: qs.stringify({ ...params, page: current }, { addQueryPrefix: true })
    // })

    // setTimeout(() => dispatch({ type: CONFIG.doData, payload }), 0)
  }

  // 设置 Pop 隐藏 展示
  setPopVisible = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  // Add Domain
  onAddTable = () => {
    const { dispatch } = this.props

    dispatch({
      type: CONFIG.updateEdit,
      payload: { 
        popDetail: {},
        isEdit: false,
      }
    })

    this.setPopVisible()
  }

  // 编辑
  onEdit = (options, type) => {
    const { dispatch } = this.props

    dispatch({
      type: CONFIG.updateEdit,
      payload: {
        popDetail: options,
        isEdit: type, // 弹窗
      }
    })
    
    this.setPopVisible()
  }

  onSwitch = (options, checked) => {
    const { dispatch } = this.props
    const { domain_id, domain_url, domain_type } = options
    dispatch({
      type: CONFIG.doUpdateStatus,
      payload: {
        domain_status: checked,
        domain_id,
        domain_url,
        domain_type,
      }
    })
  }

  render() {
    const { tableData, loading, history, pageSize, total, platform, popDetail, popData, isEdit, cfgs, current } = this.props
    const { visible } = this.state
    const btn = v => {
      let Edit = ''
      if (window.g_platform === 'backend' || v.domain_type) {
        Edit = CONFIG.Edit
      }

      return <Button type="link" onClick={() => this.onEdit(v, CONFIG.Edit)}>{Edit}</Button>
    }

    const gtSwitch = (status, options) => 
      <Switch onChange={checked => this.onSwitch(options, checked)} checked={!!status} />

    const columns = {
      frontend: [
        { title: Con.domainId, dataIndex: CONFIG.domainId, sorter: true, render: (data, all) => all.domain_code },
        { title: Con.domain, dataIndex: CONFIG.domainUrl, sorter: true },
        { title: Con.type, dataIndex: CONFIG.domainType, sorter: true, render: data => _.get(cfgs, `domain_type[${data}]`, data) },
        { title: Con.offerName, dataIndex: CONFIG.offerName },
        {
          title: Con.status,
          dataIndex: CONFIG.domainStatus,
          render: (status, options) => gtSwitch(status, options),
          sorter: true 
        },
        { title: Con.time, dataIndex: CONFIG.createTime, sorter: true, render: t => moment(t*1000).format('YYYY-MM-DD') },
        { 
          title: Con.Edit, 
          dataIndex: '', 
          render: v => btn(v)
        },
      ],
      backend: [
        { title: backendCon.DomainID, dataIndex: CONFIG.domainId, sorter: true, render: (data, all) => all.domain_code },
        { title: backendCon.Domain, dataIndex: CONFIG.domainUrl, sorter: true },
        { title: backendCon.AffiliateID, dataIndex: CONFIG.affiliateId, sorter: true, render: (a, b) => b.affiliate_code },
        { title: backendCon.Affiliate, dataIndex: CONFIG.affiliateName },
        {
          title: backendCon.Status,
          dataIndex: CONFIG.domainStatus,
          render: (status, { domain_id, domain_url }) => gtSwitch(status, { domain_id, domain_url }),
          sorter: true 
        },
        {
          title: backendCon.Date,
          dataIndex: CONFIG.createTime, 
          sorter: true,
          render: k => moment(k*1000).format('YYYY-MM-DD')
        },
        { 
          title: backendCon.Action, 
          dataIndex: '', 
          render: v => btn(v)
        },
      ]
    }

    return (
      <div className="domain">
        <Card title="Filter">
          <Filtro
            value={history.location.query}
            columns={FILTER[`${platform}Filter`]}
            onSubmit={this.onSubmit}
          />
        </Card>
        
        <Operation
          deploy={[
            { key: 'a1', name: Con.add, click: this.onAddTable, icon: 'plus' },
          ]}
        />

        <Table
          className="common-table"
          columns={columns[platform]} 
          dataSource={tableData} 
          scroll={{ x: 1300 }}
          rowKey= {dt => dt.domain_id}
          onChange={this.onChange}
          pagination={{total, pageSize: +pageSize, current}}
          loading={loading}
        />
        
        {/* Add New Domain */}
        <div className="add-new-domain">
          <Dialog
            title={isEdit ? Con.popEdit : Con.popTitle }
            visible={visible}
            onOk={this.onCreateData}
            onCancel={this.setPopVisible}
            cancelText={Con.popSave}
            centered
          >
            <Sheet
              // 如果编辑进来 默认 domain_url禁用
              disabled={isEdit && [CONFIG.domainUrl]}
              value={popDetail}
              labelCol={4}
              wrapperCol={18}
              onChange={this.onPopChange}
              columns={popData}
              wrappedComponentRef={ref => this.domainOpon = ref}
            />
          </Dialog>
        </div>
      </div>
    )
  }
}
