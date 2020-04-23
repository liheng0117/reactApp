import React, { PureComponent } from 'react'
import { formatLocale, numeral } from '@/utils'
import cs from 'classnames'
import { Dialog, Sheet, Table } from '@/components'
import { 
  MODAL_COM_FORM, 
  MODAL_COM_TABLE, 
  MODAL_COM_TABLE_1, 
  MODAL_COM_TABLE_2,
  MODAL_COM_FORM_TEXT 
} from '@/constants/billing'

export default class extends PureComponent {
  onOk = () => {
    const { modalOk } = this.props
    this.modalform.getResult()
    .then(result => {
      modalOk && modalOk(result)
    })
  }
  render() {
    const { visible, modalCancel, detail } = this.props
    const insertArr = {
      1: MODAL_COM_TABLE_1,
      2: MODAL_COM_TABLE_2,
    }
    const columns = MODAL_COM_TABLE.concat(insertArr[detail.billing_type])
    const totalArr = [{ offer_code: 'Total Amount', amount: detail.total_amount, order_amount: detail.total_amount }]
    return (
      <Dialog
        title={formatLocale('billing.detail.title')}
        visible={visible}
        onOk={this.onOk}
        onCancel={modalCancel}
        cancelText={formatLocale('common.save')}
        className={cs('billing-modal', {
          'billing-modal-left': detail.billing_type != 3
        })}
        width={600}
        centered
      >
        <Sheet
          columns={MODAL_COM_FORM_TEXT(detail)}
          labelCol={5}
          wrapperCol={18}
          value={detail}
        />
        {detail.billing_type === 3 && <Sheet
          columns={[{ 
            label: formatLocale('billing.detail.total_amount'), 
            id: 'amount', 
            type: 'Text',
            text: numeral(detail.total_amount).format('$0,0.00')  ,
          }]}
          labelCol={5}
          wrapperCol={18}
        />}
        {
          detail.offer_list && 
          <Table
            style={{marginBottom: '10px'}}
            columns={columns} 
            dataSource={detail.offer_list.concat(totalArr)} 
            pagination={false}
            rowKey= {(item) => item.offer_id}
          />
        }
        <Sheet
          columns={MODAL_COM_FORM}
          labelCol={5}
          wrapperCol={18}
          value={detail}
          wrappedComponentRef={ref => this.modalform = ref}
        />
      </Dialog>
    )
  }
}