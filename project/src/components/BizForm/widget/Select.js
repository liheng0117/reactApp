import React, { PureComponent } from 'react'
import { Select } from 'antd'
const Option = Select.Option
export default class extends PureComponent {
  doFilterOption = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
  render() {
    const { option = [], ...props } = this.props
    return (
      <Select 
          maxTagCount={1} 
          allowClear 
          showSearch
          filterOption={this.doFilterOption }
          style={{ width: '100%' }}  
          {...props} 
        >
          {
            Array.isArray(option) && option.map(({ 
              name, 
              value, 
              ...itemProps 
            }, idx) => (
              <Option 
                key={value} 
                value={value}
                {...itemProps}
              >
                { name }
              </Option>
            ))
          }
        </Select>
    )
  }
}