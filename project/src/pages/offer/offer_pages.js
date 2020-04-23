import React, { PureComponent } from 'react'
import isEqual from 'react-fast-compare'
import { is } from '@/utils'
import { Icon, Input, Row, Col, Sheet, Form } from '@/components'
function initData(args) {
  if (args.length > 0) {
    return args.map((d, idx) => ({ 
      _id: idx + 1, 
      is_delete: 0,
      ...d
    })) 
  }
  return [
    {
      _id: 1,
      is_delete: 0
    }
  ]
}
export default
@Form.create()
 class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keys: initData(props.dataSources)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.dataSources, this.props.dataSources)) {
     this.setState({
        keys: initData(nextProps.dataSources)
     })
    }
  }
  onRemove(rect) {
    const { keys } = this.state
    let _keys = keys.map(item => item._id === rect._id ? { ...item, is_delete: 1}  : item)
    this.setState({
      keys: _keys.some(d => d.is_delete !== 1) ? _keys : [..._keys, { _id: _keys.length + 1, is_delete: 0 }]
    })
  }
  getValueFromEvent = (files, file) => {
    return {
      filename: file.name,
      page_download_url: file.ObjectURL
    }
  }
  onAdd(index) {
    const { keys } = this.state
    let _keys = 
    this.setState({
      keys: [...keys, { _id: keys.length + 1, is_delete: 0 }]
    })
  }
  getResult() {
    const { form } = this.props
    return new Promise((resolve, reject) => {
      form.validateFields((err, values) => {
        if (!err) {
          let { keys, ...data} = values
          let result = keys.map(({ _id, ...item}) => ({
            ...item,
            page_code: data[`${_id}-code`],
            name: data[`${_id}-name`],
            filename: data[`${_id}-filename`],
            url: data[`${_id}-url`],
            ...data[`${_id}-file`]
          }))
          resolve(result)
        }
        reject(err)
      })
    })
  }
  render() {
    const { dataSources = [], form } = this.props
    const { keys } = this.state
    form.getFieldDecorator('keys', { initialValue: keys })
    return (
      <div>
        {
          keys.filter(d => d.is_delete !== 1).map(item => (
            <Row key={item._id} gutter={12} className="offer-detail-page">
              <Col span={2}>
                {
                  form.getFieldDecorator(`${item._id}-code`, {
                    initialValue: item.page_code,
                    valuePropName: 'children'
                  })(<span className="offer-detail-page__label" />)
                }
              </Col>
              <Col span={4}>
                <Form.Item style={{ marginBottom: 0 }}>
                  {
                    form.getFieldDecorator(`${item._id}-name`, {
                        initialValue: item.name,
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: 'Please input offer page name field'
                        }]
                      })(<Input />)
                  }
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item style={{ marginBottom: 0 }}>
                  {
                    form.getFieldDecorator(`${item._id}-url`, {
                      initialValue: item.url,
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: 'Please input offer page url address'
                      }]
                    })(<Input />)
                  }
                  </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item style={{ marginBottom: 0 }}>
                  <span className="offer-detail-page__upload">
                  {
                    form.getFieldDecorator(`${item._id}-file`, {
                      getValueFromEvent: this.getValueFromEvent
                    })(
                      <Sheet.Upload
                        type="default"
                        showUploadList={false}
                      >
                        Upload Offer Page
                      </Sheet.Upload>
                    )
                  }
                  </span>
                    <span className="offer-detail-page__opt">
                      <Icon type="plus"  onClick={() => this.onAdd()}/>
                      <Icon type="minus" onClick={() => this.onRemove(item)} />
                    </span>
                    </Form.Item>
                </Col>
            </Row>
          ))
        }
      </div>
    )
  }
}