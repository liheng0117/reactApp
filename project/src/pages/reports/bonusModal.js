import React, { PureComponent } from 'react'
import { formatLocale, _ } from '@/utils'
import { Dialog, Sheet } from '@/components'
import { BONUS_ADD } from '@/constants/reports'

export default class extends PureComponent {
  onOk = () => {
    const { modalOk, classes, order_bonus_extro } = this.props
    let params = {}
    classes === 'order' && (params={
      offer_id: order_bonus_extro.offer_id,
      source_order_no: order_bonus_extro.order_no,
      affiliate_id: order_bonus_extro.affiliate_id,
    })
    this.modalform.getResult()
    .then(result => {
      modalOk && modalOk({
        result: { bonus_type: classes === 'bonus' ? 1 : 2, ...result, ...params }, 
        type: 'createBonus'
      })
    })
  }
  render() {
    const { visible, classes, modalCancel, order_bonus_extro } = this.props
    return (
      <Dialog
        title={classes === 'order' ? formatLocale('report.backend.order.add.bonusTitle') : formatLocale('report.backend.bonus.add.bonusTitle')}
        visible={visible === 'bonus'}
        onOk={this.onOk}
        onCancel={modalCancel}
        cancelText={formatLocale('common.add')}
        width={600}
        centered
      >
        <Sheet
          columns={BONUS_ADD[classes]}
          className='reportl-sheet'
          labelCol={5}
          wrapperCol={18}
          value={{order_no: _.get(order_bonus_extro, 'order_no', null)}}
          wrappedComponentRef={ref => this.modalform = ref}
        />
      </Dialog>
    )
  }
}