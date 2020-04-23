import './styles.less'
import React, { PureComponent } from 'react'
import isEqual from 'react-fast-compare'
import { is, _ } from '@/utils'
import { Form, Input, Select, Checkbox, Button, DatePicker, Related, InputNumber } from '../'
import InputGroup from './widget/InputGroup'
import Verification from './widget/Verification'
import Search from './widget/Search'
import Upload from './widget/Upload';
import { scheme } from './cfgs'
import hook from './hook'
const { Item, create, createFormField } = Form

const exclusions = ['Button', 'Text', 'Submit'] // 数据字典忽略的类型
function subtle(columns) {
  return Array.isArray(columns) && columns.reduce((obj, next) => {
    return next.id ? { 
      ...obj, 
      [next.id]: {
        onPush: is.function(next.onPush) ? next.onPush : function(v) { return is.number(v) ? v.toString() : v },
        onPull: is.function(next.onPull) ? next.onPull : function(v) { return v }  
      }
    } : { ...obj }
  }, {})
}

export default

@create({
  mapPropsToFields: ({ columns, value = {} }) => {
    return is.array(columns) ? columns.reduce((prev, next) => {
      let onPush = is.function(next.onPush) ?  next.onPush : function(v) { return is.number(v) ? v.toString() : v} 
      return exclusions.includes(next.type) ? prev 
      : {
        ...prev, 
        [next.id]: createFormField({ value: onPush(value[next.id]) }) 
      }
    }, {}) : {}
  },
  onValuesChange: (props, changedValues, allValues) => {
    if (props.onChange) {
      let matrix = subtle(props.columns)
      allValues = Object.keys(allValues).reduce((pre, curr)=> {
        return {
          ...pre,
          [curr]: matrix[curr].onPull(allValues[curr])
        }
      }, {})
      props.onChange(allValues, changedValues)
    }
  }
})
class Sheet extends PureComponent {
  static defaultProps = {
    layout: 'horizontal',
    labelCol: 6,
    wrapperCol: 14
  }
  constructor (props) {
    super(props)
    this.matrix = subtle(props.columns)
    this.getFieldDecorator = props.form.getFieldDecorator
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.columns, this.props.columns)) {
      this.matrix = subtle(nextProps.columns)
    }
  }
  getResult(flag) {
    const { form } = this.props
    return new Promise((resolve, reject) => {
      form.validateFields((err, values) => {
        if (!err) {
          values = Object.keys(values).reduce((pre, curr)=> {
            return {
              ...pre,
              [curr]: this.matrix[curr].onPull(values[curr])
            }
          }, {})
          resolve(values)
        }
        reject(err)
      })
    })
    
  }
  
  // 处理自定义验证
  onValidator (optics, parameter) {
    const { value, callback } = parameter 
    if (is.existy(optics.verify)) {
      // 判断是不是函数
      if (is.function(optics.verify)) {
        let data = this.props.form.getFieldsValue()
        let result = optics.verify(value, data)
        if (!result || is.not.function(result.then)) {
          // 不是promise 时，log出错误提示
          console.error('Error:If verify a function, it must return a promise')
          return 
        } else {
          result.then(() => callback()).catch(err => callback(err))
        }
      } else if (is.array(optics.verify) && optics.verify.length >= 1) {
        // 内置一些常用的验证规则
        let [rule, message] = optics.verify
        if (rule in scheme) {
          scheme[rule](value) ? callback() : callback((message ? message : `This field ${optics.id} was not validated`))
        } else {
          callback('The incoming validation rule does not exist')
        }
      } else return
    } else {
      callback()
    }
  }
  renderChild ({ type, option, props, ...rest }, _disabled) {
    props = { disabled: _disabled, ...props }
    switch (type) {
      case 'Input':
        return <Input {...props} />
      case 'TextArea':
        return <Input.TextArea {...props} />
      case 'InputNumber':
      return <InputNumber {...props} style={{ width: '100%'}}/>
      case 'Search': 
        return <Search {...props} />
      case 'InputGroup': 
        return <InputGroup {...props} />
      case 'Verification': 
        return <Verification {...props}/>
      case 'Checkbox':
        return <Checkbox {...props}>{rest.label}</Checkbox>
      case 'RangePicker': 
        return <DatePicker.RangePicker {...props} style={{ width: '100%' }}  />
      case 'DatePicker': 
        return <DatePicker {...props} style={{ width: '100%' }} />
      case 'Select':
        return (<Select option={option} {...props} />)
      case 'Upload':
         return <Upload {...props}/>
      case 'Related':
        return <Related option={option} {...props} />
      case 'Button': 
        return <Button type="primary" {...props}>{rest.text || rest.label}</Button>
      case 'Submit':
        return <Button type="primary" block={true} {...props}>{rest.text || rest.label}</Button>
      case 'Text': 
        return <span>{rest.text}</span>
      default:
        return null
    }
  }
  // 统一设置field字典
  doFieldDecorator(item, _disabled) {
    return this.getFieldDecorator(String(item.id), {
      validateFirst: true,
      rules: [
        { 
          required: !!item.required, 
          message: is.string(item.required) ? item.required : `Please enter the ${item.id} content` 
        }, {
          validator: (rule, value, callback) => this.onValidator(item, {rule, value, callback})
        },
      ]
    })(this.renderChild(item, _disabled))
  }
  renderItem = (item, idx) => {
    const { labelCol, wrapperCol, layout, disabled, filter = (v) => true } = this.props
    let _disabled = is.array(disabled) ? disabled.includes(item.id) : !!disabled
    const special = ['Checkbox', 'Submit'].includes(item.type)
    const props = layout === 'vertical' ? {} : {
      labelCol: { span: labelCol },
      wrapperCol: special  ? { span: wrapperCol, offset: labelCol } : { span: wrapperCol }
    }
    return filter(item.id, item) && (
      <Item 
        key={item.id} 
        label={special ? undefined : item.label}
        {...props} 
      >
        {
          exclusions.includes(item.type) ? this.renderChild(item, _disabled) : this.doFieldDecorator(item, _disabled)
        }
      </Item>
    )
  }
  render () {
    const { columns, layout, hidden, className } = this.props
    let visible = hidden || []
    console.log('heill')
    return (
      <Form layout={layout} className={className}>
        {
         is.array(columns) && columns.filter(d => !visible.includes(d.id)).map(this.renderItem)
        }
      </Form>
    )
  }
}

Sheet.Upload = Upload