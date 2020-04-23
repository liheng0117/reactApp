import React, { PureComponent } from 'react'
import { formatLocale } from '@/utils'
import { Dialog, Sheet, Table, Button } from '@/components'
import { BILLINGCOLUMNS } from '@/constants/reports'

export default class extends PureComponent {
  onOk = () => {
    const { modalOk, billing_detail } = this.props
    this.modalform.getResult()
    .then(result => {
      modalOk && modalOk({
        result: { 
          billing_type: billing_detail.billing_type, 
          ...result 
        }, 
        type: 'createBilling',
      })
    })
  }
  render() {
    const { visible, modalCancel, billing_detail, effects } = this.props
    const { affiliate_id,affiliate_code, affiliate_name, offer_list, billing_type, total_amount, isDetail } = billing_detail
    const columns_type = isDetail ? 'edit' : 'add'
    const arr = billing_type != 3 ? [] : [
      { 
        id: 'amount',
        label: formatLocale('report.backend.bonus.add.bonusL_Amount'),
        type: 'Text',
        props: {
          children: `$${total_amount}`
        } 
      }
    ]

    return (
      <Dialog
        title={`${formatLocale('report.add.billing.title')}`}
        visible={visible === 'billing'}
        onOk={this.onOk}
        onCancel={modalCancel}
        cancelText={formatLocale('common.add')}
        width={600}
        footer={isDetail ? null : [
          <Button key="submit" loading={!!effects['reports/add']} type="primary" onClick={this.onOk}>
            {formatLocale('common.add')}
          </Button>,
          <Button key="back" onClick={modalCancel}>{formatLocale('common.cancel')}</Button>,
        ]}
        centered
      >
        <Sheet
          className={billing_type != 3 ? 'labelLeft' : ''}
          columns={[
            { 
              id: 'affiliate_code', 
              label: formatLocale('report.Bonus.list.columns.Affiliate'),
              type: 'Text',
              props: { children: affiliate_code }
            },
            { id: 'affiliate_name', label: formatLocale('report.Bonus.list.columns.Affiliate'),
              type: 'Text',
              props: { children: affiliate_name }
            }
          ].concat(arr)}
          labelCol={4}
          wrapperCol={18}
        />
        {
          billing_type != 3 && 
          <Table
            columns={BILLINGCOLUMNS[columns_type][billing_type]} 
            // scroll={{ x: 200  }}
            dataSource={offer_list} 
            rowKey= {(item, index) => index}
            pagination={false}
            style={{marginBottom: '10px'}}
          />
        }
        <Sheet
          // columns={arr.concat(BILLINGCOLUMNS[columns_type]['form'])}
          columns={BILLINGCOLUMNS[columns_type]['form']}
          labelCol={4}
          wrapperCol={18}
          className={billing_type != 3 ? 'labelLeft' : ''}
          value={billing_detail}
          disabled={isDetail ? ['period_time', 'memo'] : []}
          wrappedComponentRef={ref => this.modalform = ref}
        />
      </Dialog>
    )
  }
}