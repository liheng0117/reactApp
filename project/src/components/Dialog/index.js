import React from 'react'
import { Modal } from '../'
export default ({ children, ...props }) => {
  let restProps = {
    okButtonProps: { type: 'default' },
    cancelButtonProps: { type: 'primary' },
    okText: 'Cancel',
    cancelText: 'Add',
    ...props,
    wrapClassName: props.centered && 'nwd-modal-custom__centered',
    onOk: e => props.onCancel && props.onCancel(e),
    onCancel: e => {
      return e.target.localName === 'button' ? (props.onOk && props.onOk(e)) : (props.onCancel && props.onCancel(e))
    }
  }
  return <Modal {...restProps}>{children}</Modal>
}