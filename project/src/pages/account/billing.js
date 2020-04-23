import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { formatLocale } from '@/utils'
import './styles.less'
import { Sheet, Card, Row, Col } from '@/components'
import { ACCOUNT_SHEET } from '@/constants/user'

export default
@connect(({ router, account }) => ({
  router,
  account,
}))
class Billing extends PureComponent {
  render() {
    const { billing_detail } = this.props.account
    return(
      <div className="account-tabs">
        <Row>
          <Card
            none-bordered="head"
            title={formatLocale('user.billing.detail')} 
          >
            <Col span={13} > 
              <Sheet
                labelCol={11}
                wrapperCol={11}
                value={billing_detail}
                columns={ACCOUNT_SHEET.BILLING} 
                wrappedComponentRef={ref => this.form = ref}
              />
            </Col>
          </Card>
        </Row>
      </div>
    )
  }
}
