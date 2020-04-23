import React, { PureComponent } from 'react'
import Link from 'umi/link'
import { connect } from 'dva'
import { qs } from '@/utils'
import { formatMessage } from 'umi-plugin-locale'
import { Filtro, Card, Col, Row, Table, Clay, Chart, Radio } from '@/components'

import { 
  REVENUE_COLUMNS,
  RATE_COLUMNS, 
  BOUNS_COLUMNS, 
  OFFERS_COLUMNS, 
  PAYOUT_COLUMNS,
  PERIOD
} from '@/constants/dashboard'
import { moment } from '@/utils'

export default
@connect(({ loading, app, dashboard, cfgs }) => ({
  timezone: cfgs.timezone,
  app,
  platform: app.platform,
  data: dashboard,
  loading: loading.effects
}))
class extends PureComponent {
  onZoneChange = (timezone_id) => {
    const { history, location } = this.props
    let query = qs.parse(location.search, { ignoreQueryPrefix: true })
    query = qs.stringify({ ...query, timezone_id }, { addQueryPrefix: true })
    history.push(`${location.pathname}${query}`)
  }
 
  onPeriodChange = e => {
    const { history, location } = this.props
    let query = qs.parse(location.search, { ignoreQueryPrefix: true })
    query = qs.stringify({ ...query, show_type: e.target.value }, { addQueryPrefix: true })
    history.push(`${location.pathname}${query}`)
  }
  render() {
    const { data, platform, location, timezone, app, loading } = this.props
    const cardStyle = { marginTop: 24 }
    const colStyle = { marginTop: 24 }
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    if (platform === 'backend') {
      return (
        <>
         <Card bordered={false} style={cardStyle} title="Summary Of Confirmed Orders">
            <Clay 
              dataSource={data.conversion}
              columns={REVENUE_COLUMNS}
            />
          </Card>
          <Card 
            title="Cost"
            bordered={false} 
            style={cardStyle}
          >
            <Chart 
              data={data.cost} 
              xAxis="time" 
              yAxis={['cost', 'conversions']} 
              xAxisFormatter={x => moment(Number(x)).format('LL')}
            />
          </Card>
          <Card 
            title="Performace（Last 7 Days)"
            bordered={false} 
            style={cardStyle}
          >
            <Chart 
              data={data.performance} 
              xAxis="time" 
              yAxis={['clicks', 'conversions']}
              xAxisFormatter={x => moment(Number(x)).format('LL')}
            />
          </Card>
        </>
      )
    }
    return (
      <>
        <Card bordered={false}>
          <Filtro.Select 
            defaultValue={String(app.timezone_id)}
            style={{ width: 200 }}
            option={Object.keys(timezone).map(k => ({ name: timezone[k].en_name, value: k }))}
            onChange={this.onZoneChange}
          />
        </Card>
        <Card bordered={false} style={cardStyle} bodyStyle={{paddingTop: 0}}>
          <Row gutter={16}>
            <Col span={24} style={colStyle}>
              <Card 
                title={formatMessage({ id: 'dashboard.revenue'})} 
                extra={<Link to="/reports/summary">See More >></Link>}
              >
                <Clay 
                  dataSource={data.revenue}
                  columns={REVENUE_COLUMNS}
                />
              </Card>
            </Col>
            <Col span={12} style={colStyle}>
              <Card title={formatMessage({ id: 'dashboard.rate' })}>
                <Clay dataSource={data.rate} columns={RATE_COLUMNS} valueColor="#218FCF" />
              </Card>
            </Col>
            <Col span={12} style={colStyle}>
              <Card title="Bonus" extra={<Link to="/reports/bonus">See More >></Link>}>
                <Clay dataSource={data.bonus} columns={BOUNS_COLUMNS} valueColor="#EEC04E" />
              </Card>
            </Col>
          </Row>
        </Card>
        <Card 
          title={[
            <span key="title">My Offers</span>,
            <Radio.Group 
              key="btns" 
              name="button"
              value={query.show_type || '1'}
              onChange={this.onPeriodChange}>
              {
                PERIOD.map(item => (
                  <Radio.Button key={item.key} value={item.key}>
                    {item.label}
                  </Radio.Button>
                ))
              }
            </Radio.Group>
          ]}
          extra={<Link to="/offers">See More >></Link>}
          bordered={false} 
          style={cardStyle}
        >
          <Table 
            dataSource={data.offers} 
            rowKey="offer_id"
            scroll={app.scroll}
            columns={OFFERS_COLUMNS} 
            pagination={false}
            loading={!!loading['dashboard/fetchOffers']}
          />
        </Card>
        <Card 
          title="Payout(last 5 times)"
          bordered={false} 
          style={cardStyle}
          extra={<Link to="/payouts">See More >></Link>}
        >
          <Table 
            dataSource={data.payouts} 
            rowKey="billing_id" 
            columns={PAYOUT_COLUMNS}
            pagination={false}
            loading={!!loading['dashboard/fetchPayouts']}
          />
        </Card>
        <Card 
          title="Performance"
          bordered={false} 
          style={cardStyle}
        >
          <Chart 
            data={data.performance} 
            xAxis="time" 
            yAxis={['clicks', 'conversions']} 
            xAxisFormatter={x => moment.unix(Number(x)).format('LL')}
          />
        </Card>
      </>
    )
  }
}