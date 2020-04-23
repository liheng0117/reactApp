import React, { PureComponent } from 'react'
import { Upload, Button, Modal, Icon } from '../..'
import axios from 'axios'
import { message } from 'antd';
export default class extends PureComponent {
  static defaultProps = {
    allowClear: false,
    showType: 'URL',
    allowPreview: false,
    isUpdate: true,
    action: '/netapi/upload_file'
  }
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      uploading: false,
      fileList: props.value || []
    }
  }
  componentWillReceiveProps (nextProps) {
    if ('value' in nextProps) {
      this.setState({
        fileList: nextProps.value
      })
    }
  }
  onChange = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      this.setState({
        uploading: true,
        fileList
      })
    }
    if (file.status === 'done') {
      if (file.response.code === 200) {
        fileList = fileList.map(({ response, ...item }) => response ? { ...item, ...response.result } : item)
        this.setState({
          uploading: false,
          fileList
        }, () => {
          const { onChange } = this.props
          onChange && onChange(fileList, fileList.find(f => f.uid === file.uid))
        })
      }else{
        this.setState({
          uploading: false,
        })
        message.error(file.response.msg)
      }
    }
  }
  onPreview = (file) => {
    let aElement = document.createElement("a")
    aElement.setAttribute('href', file.ObjectURL || file.url)
    aElement.setAttribute('target', '__blank')
    document.body.appendChild(aElement)
    aElement.click()
    setTimeout(() => {
      document.body.removeChild(aElement)
    }, 1000)
  }
  render() {
    const { uploading,  fileList } = this.state
    const { allowClear, showType, allowPreview, isUpdate, type='primary', action, children, ...props } = this.props
    return (
      <Upload
        showUploadList={true}
        {...props}
        action={action}
        fileList={fileList}
        listType="picture"
        onChange={this.onChange}
        onPreview={this.onPreview}
      >
        <Button type={type} loading={uploading} >
          { children || 'Upload' }
        </Button>
      </Upload>
    )
  }
}