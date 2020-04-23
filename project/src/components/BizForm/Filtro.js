import './styles.less'
import React, { PureComponent } from 'react'
import isEqual from 'react-fast-compare'
import { is, _, date, moment } from '@/utils'
import { Form, Row, Col, Button } from 'antd'
import { componentGC } from './cfgs'
const { create, createFormField, Item } = Form
// 初始化数据字典
function subtle(columns) {
  return Array.isArray(columns) && columns.reduce((obj, next) => {
    return next.id ? { 
      ...obj, 
      [next.id]: {
        onPush: is.function(next.onPush) ? next.onPush : function(v) { return v },
        onPull: is.function(next.onPull) ? next.onPull : function(v) { return v }  
      }
    } : { ...obj }
  }, {})
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 10 },
    xl: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 14 },
    xl: { span: 14 },
  },
}
export default
@create({
  mapPropsToFields: ({ columns, value = {} }) => {
    let result = value && is.array(columns) ? columns.reduce((prev, next) => {
      let onPush = is.function(next.onPush) ?  next.onPush : function(v) { return v } 
      return {
        ...prev, 
        [next.id]: createFormField({ 
          value: onPush(value[next.id]) || next.initialValue || (componentGC[next.type] ? componentGC[next.type].initialValue : null)
        }) 
      }
    }, {}) : {}
    console.log('result', result)
    return result
  },
  onValuesChange: (props, changedValues, allValues) => {
    if (props.onChange) {
      let matrix = subtle(props.columns)
      allValues = Object.keys(allValues).reduce((pre, curr)=> {
        return { ...pre, [curr]: matrix[curr].onPull(allValues[curr]) }
      }, {})
      props.onChange(allValues, changedValues)
    }
  }
})
class Filtro extends PureComponent {
  static defaultProps = {
    relevance: {},
    okText: 'Apply',
    clearText: 'Clear',
    allowSubmit: true,
    allowClear: true
  }
  constructor(props) {
    super(props)
    this.matrix = subtle(props.columns)
    this.getFieldDecorator = props.form.getFieldDecorator
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.columns, this.props.columns)) {
      this.matrix = subtle(nextProps.columns)
    }
  }
  renderItem ({ id, type, initialValue, props, option }) {
    if (!type in componentGC) return null
    let FakeComponent = componentGC[type].component
    let combProps = {
      ...componentGC[type].props,
      option,
      ...props
    }
 
    let suggest = { initialValue, ...componentGC[type].suggest }
    console.log('abs', suggest)
    return this.getFieldDecorator(String(id), suggest)(React.cloneElement(<FakeComponent />, combProps, null))
  }
  // 提交
  onSubmit = () => {
    const { onChange, onSubmit, form } = this.props
    if (!onChange && onSubmit) {
      let values = form.getFieldsValue()
      onSubmit(this.wipeOut(values))
    }
  }
  // 清除
  onClear = () => {
    const { onChange, allowClear, onSubmit, form } = this.props
    if (!onChange && allowClear) {
      form.resetFields()
      onSubmit({})
    }
  }
  // 去除空值
  wipeOut(obj) {
    return Object.keys(obj).reduce((pre, key) => {
      return obj[key] ? { 
        ...pre, 
        [key]: this.matrix[key].onPull(obj[key])
      } : pre
    }, {})
  }
  render() {
    const { columns, okText, clearText } = this.props
    return (
      <Form>
        <Row gutter={12}>
          {
            Array.isArray(columns) && columns.map(item => (
              <Col key={item.id} span={24} xl={6} lg={8} md={12} sm={24}>
                <Item label={item.label}  {...formItemLayout} className="filtro-item">
                { this.renderItem(item) }
                </Item>
              </Col>
            ))
          } 
        </Row>
        <Row>
          <Col span={24} className="filtro-action">
            <Button type="primary" onClick={this.onSubmit}>{okText}</Button>
            <Button onClick={this.onClear}>{clearText}</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

Filtro.Select = componentGC.Select.component