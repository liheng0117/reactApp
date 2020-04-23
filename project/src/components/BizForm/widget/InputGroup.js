import React, { PureComponent} from 'react'
// import PropTypes from 'prop-types'
import { Input, Row, Col } from '../..'
export default class InputGroup extends PureComponent {
  static defaultProps = {
    grid: 2
  }
  constructor(props) {
    super(props)
    this.rules = {
      20: { 2: [7, 13], 3: [4, 8, 8] },
      24: { 2: [8, 16], 3: [6, 9, 9] }
    }
    this.state = {
      value: Array.isArray(props.value) ? props.value : []
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Array.isArray(nextProps.value) ? nextProps.value : []
      })
    }
  }
  onChange = (e, index) => {
    const { value } = this.state
    let _value = [...value]  
    _value[index] = e.target.value
    this.setState({
      value: _value
    }, () => {
      this.props.onChange && this.props.onChange(this.state.value)
    })
  }
  render() {
    const { grid,  suffix } = this.props
    const { value } = this.state
    let list = suffix ? this.rules[20][grid] : this.rules[24][grid]
    return (
      <Input.Group>
        <Row gutter={8}>
          {
            list.map((span, idx) => (
              <Col span={span} key={idx}>
                <Input onChange={e => this.onChange(e, idx)} value={value[idx]}/>
              </Col>
            ))
          }
          {
            suffix && <Col span={4} className="sheet-group-suffix">{suffix}</Col>
          }
        </Row>
      </Input.Group>
    )
  }
}
