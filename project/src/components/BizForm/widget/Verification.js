import React, { PureComponent } from 'react'
import { Input, Row, Col, Spin, Icon } from '../..'

/** 
 * 统一验证码输入框
*/
export default class Verification extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      random: Date.now(),
      loading: true,
      value: undefined
    }
  }
  onClick = () => {
    this.setState({
      loading: true,
      random: Date.now()
    })
  }
  onChange = (e) => {
    const { onChange } = this.props
    const value = e.target.value
    this.setState({
      value
    }, () => {
      onChange && onChange(value)
    })
  }
  onLoad = () => {
    this.setState({ loading: false })
  }
  getValue = () => {
    return this.state.value
  }
  render() {
    const { random, loading, value } = this.state
    const { url, placeholder, prefix} = this.props
    return (
      <Input.Group>
        <Row gutter={24}>
          <Col span={14}>
            <Input
              value={value}
              placeholder={placeholder}
              prefix={prefix}
              onChange={this.onChange}
            />
          </Col>
          <Col span={10}>
          <Spin spinning={loading}>
            <div className="verification-img" onClick={this.onClick}>
              <img
                onLoad={this.onLoad}
                src={`${url}?code=${random}`}
                alt=""
              />
            </div>
            </Spin>
          </Col>
        </Row>
     </Input.Group>
    )
  }
} 