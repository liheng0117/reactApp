import './styles.less'
import React from 'react'
import { connect } from 'dva'
import InfiniteScroll from 'react-infinite-scroller'
import { Sheet, Operation, Table, Select, Card, InputNumber, List, DatePicker } from '@/components'
import { Con } from '@/constants/affiliate'
import { tools, numeral, decorator, moment, cs } from '@/utils'
const { eventHook, eventFunc } = decorator
const { Option } = Select

export default
@connect(({ app, cfgs, addAffiliate, loading }) => {
  return {
    tableData: addAffiliate.tableData,
    addFromData: addAffiliate.addFromData,
    cacheData: addAffiliate.cacheData,
    current: addAffiliate.current,
    saveTime: addAffiliate.saveTime,
    cfgs,
    total: addAffiliate.total,
    pageSize: addAffiliate.pageSize,
    affiliate_id: addAffiliate.affiliate_id,
    loading: !!loading.effects['addAffiliate/doOfferList'] || !!loading.effects['addAffiliate/doCreate'] || !!loading.effects['addAffiliate/doAffiliateUpdate'],
  }
})
class extends React.Component {
  state = {
    hasMore: true,
    options: [],
    value: '',
  }

  constructor (props) {
    super(props)
    const { cfgs } = props
    const region = {}

    if (!localStorage.getItem('cacheRegion')) {
      Object.values(cfgs.region).forEach(v => {
        const id = v.country_id
        if (!region[id]) {
          region[id] = []
        }
        region[id].push(v)
      })
      localStorage.setItem('cacheRegion', JSON.stringify(region))
    }
  }

  onSubmit = () => {
    const { dispatch, saveTime, tableData, affiliate_id, cacheData } = this.props
    const getOptions = ({ affiliate_detail, user_detail, billing_detail }, options = '') => {
      let params = []
      const copyData = JSON.parse(JSON.stringify(tableData))
      const isId = user_detail.manager_id.match(/[^0-9]/g)

      copyData.filter(data => { 
        const { offer_id, payout, create_time, effective_time } = data
        if (data.payout || (saveTime.indexOf(data.offer_id) !== -1)) {
          params.push({ offer_id, payout, effective_time })
        }
      })

      if ( !affiliate_id ) {
        options = {
          type: 'addAffiliate/doCreate',
          payload: {
            affiliate_detail,
            user_detail,
            billing_detail,
            offer_settings: {
              offer_list: params,
            }
          }
        }

      } else {
        options = {
          type: 'addAffiliate/doAffiliateUpdate',
          payload: {
            basic_detail: { 
              ...affiliate_detail, 
              ...user_detail, 
              affiliate_id,
              manager_id: isId ? cacheData.user.manager_idd : user_detail.manager_id,
            },
            billing_detail,
            offer_settings: {
              offer_list: params,  // 表格数据列表
            },
          }
        }
      }
      return options
    }

    Promise.all([
      this.affiliate.getResult(),
      this.user.getResult(),
      this.billing.getResult(),
    ])
      .then(([affiliate_detail, user_detail, billing_detail]) => {
        dispatch(getOptions({
          affiliate_detail, 
          user_detail, 
          billing_detail,
          offer_settings: {
            offer_list: tableData,  // 表格数据列表
          },
        }))
      })
  }

  isClearRegionID = ({ country_id, all }) => {
    // 如果2次切换国家名字相同 则不清空 region_id
    if (this.prevCountryID !== country_id) {
      // 清空地区展示内容
      all.region_id = ''
    }
    // 记录上一次的 Region 值
    this.prevCountryID = country_id
  }

  onBillingChange = (all, { country_id }) => {
    const { dispatch } = this.props
    
    if (country_id) {
      // 国家地区联动
      this.countryRegion({ country_id, dispatch })
      // 是否清空 region_id
      this.isClearRegionID({ country_id, all })
    }

    dispatch({
      type: 'addAffiliate/updateCacheData',
      payload: { key: 'billing', all }
    })
  }

  // 国家地区联动
  countryRegion = ({ country_id, dispatch }) => {
    const region = JSON.parse(localStorage.getItem('cacheRegion'))
    const option = tools.serializeOptions(
      region[country_id], 
      { name: 'en_name', value: 'id', fKey: 'country_id', id: country_id }
    )
    
    dispatch({
      type: 'addAffiliate/updateRegion',
      payload: { 
        option,
        country_id,
        id: 'region_id', 
        name: 'billingInformation', 
      }
    })
  }

  disabledEndDate = endValue => {
    const startValue = moment().subtract(1, 'days').valueOf()
    if (!endValue || !startValue) {
      return false;
    }
    return moment(endValue).valueOf() < startValue
  };

  onChange = key => all => {
    const { dispatch } = this.props
    dispatch({
      type: 'addAffiliate/updateCacheData',
      payload: { key, all }
    })
  }

  onClear = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'addAffiliate/updateInitCacheData',
      payload: {  // 保存表单值
        affiliate: {},
        user: {},
        billing: {},
      },
    })
  }

  onSearch = options => {
    const { dispatch } = this.props

    dispatch({
      type: 'app/fetchSearch',
      payload: {
        field: 'offer_name',
        value: options,
        _v: 'offer_id', 
        _n: 'offer_name',
        _c: 'offer_code',
      }
    })
      .then(res => this.setState({
        options: res
      }))
  }

  // 滚动加载 offer
  handleInfiniteOnLoad = page => {
    const { dispatch, total, pageSize, affiliate_id } = this.props

    // 滚动到最后一页 禁止滚动
    if (Math.ceil(total/pageSize) < page) {
      this.setState({
        hasMore: false,
      })
      return false
    }

    dispatch({
      type: 'addAffiliate/doOfferList',
      payload: { page, edit_affiliate_id: affiliate_id }
    })
  }

  onDateChange = (time, opt) => {
    const { dispatch } = this.props
    dispatch({
      type: 'addAffiliate/updateEditTime',
      payload: {
        time: time.valueOf(),
        opt,
      }
    })
  }

  handleChange = value => {
    const { dispatch, affiliate_id } = this.props

    this.setState({ value })

    dispatch({
      type: 'addAffiliate/doOfferList',
      payload: {
        offer_id: value,
        edit_affiliate_id: affiliate_id,
      }
    })
  }

  render () {
    const { tableData, addFromData, cacheData, loading, current, affiliate_id } = this.props
    const { affiliateInformation, userInformation, billingInformation } = addFromData
    const { affiliate, user, billing } = cacheData
    const { hasMore, value } = this.state
    const options = this.state.options.map(d => <Option key={d.value}>{d.name}</Option>);
    const addColumns = [
      { title: Con.offerName, dataIndex: 'offer_name', },
      { title: Con.defaultPayout, dataIndex: 'default_payout', render: v => `$${numeral(v || 0).format('0,0.00')}` },
      { 
        title: Con.payout, 
        dataIndex: 'payout',
        render(v, rec, index) {
          return eventHook(e => ({ 
            type: 'addAffiliate/updateEditTable',
            payload: { value: e.target.value.replace(/\$\s?|(,*)/g, ''), index }
          }), 'onBlur')(
            <InputNumber
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              min={0} 
            />
          )
        },
      },
      {
        title: Con.EffectiveTime, 
        dataIndex: 'effective_time',
        render: (text, opt) => {
          return <DatePicker
            disabledDate={this.disabledEndDate}
            defaultValue={text ? moment(text*1000) : null} 
            onChange={v => this.onDateChange(v, opt)} 
            style={{width: 250}}
          />
        }
      },
    ]

    return (
      <div className="add-affiliate">
        {/* Affiliate Information */}
        <Card title={Con.affiliateInformation} none-bordered={Con.head}>
          <Sheet
            value={affiliate}
            columns={affiliateInformation}
            onChange={this.onChange('affiliate')}
            wrappedComponentRef={ref => this.affiliate = ref}
          />
        </Card>
        
        {/* User Information */}
        <Card title={Con.userInformation} none-bordered={Con.head} data-margin={Con.top}>
          <Sheet
            value={{...user}}
            columns={userInformation}
            onChange={this.onChange('user')}
            wrappedComponentRef={ref => this.user = ref}
          />
        </Card>

        {/* Billing Information */}
        <Card title={Con.billingInformation} none-bordered={Con.head} data-margin={Con.top}>
          <Sheet
            value={billing}
            columns={billingInformation}
            onChange={this.onBillingChange}
            wrappedComponentRef={ref => this.billing = ref}
          />
        </Card>
        
        {/* Offer Settings */}
        <Card title={Con.offerSettings} none-bordered={Con.head}>
          <Select
            showSearch
            allowClear={true}
            value={value}
            placeholder='input search text'
            style={{width: 200, marginBottom: 20}}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.onSearch}
            onChange={this.handleChange}
            notFoundContent={null}
          >
            {options}
          </Select>

          {/* <div className="infinite-scroll"> */}
          <div className={cs({'infinite-scroll': tableData.length !== 1})}>
            <InfiniteScroll
              initialLoad={false}
              pageStart={1}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!loading && hasMore}
              useWindow={false}
            >
              <List>
                <Table
                  className="offer-table"
                  columns={addColumns} 
                  dataSource={tableData}
                  pagination={false}
                  showHeader={current == 1}
                  rowKey= {dt => dt.offer_id}
                />
              </List>
            </InfiniteScroll>
          </div>
        </Card>

        <Operation
          deploy={[
            { 
              key: 'a1', 
              loading: loading,
              name: !affiliate_id ? Con.save : Con.edit , click: this.onSubmit 
            },
            { key: 'a2', name: Con.clear, click: this.onClear, type: 'default' },
          ]}
          justify="center"
        />
      </div>
    )
  }
}