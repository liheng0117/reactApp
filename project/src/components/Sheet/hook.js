import React from 'react'
import isEqual from 'react-fast-compare'

export default function () {
  return WrappedComponent => {
    return class extends React.PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          ...props
        }
      }
      componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps, this.props)) {
          this.setState({
            ...nextProps
          })
        }
      }
      onChange = (allValues, changedValues) => {
        const { columns, onChange, hook = {} } = this.state
        const { trigger, collect, onEvent } = hook
        const doEvent = (value) => {
          let collectProps = collect ? columns.find(d => d.id === collect) : columns
          let itemProps = onEvent(value, collectProps) || collectProps
          this.setState({
            value: allValues,
            columns: collect ? columns.map(d => d.id === collect ? {...d, ...itemProps} : d ) : itemProps
          })
        }
        if (onEvent) {
          if (trigger && trigger in changedValues) {
            doEvent(changedValues[trigger])
          } else {
            doEvent(allValues)
          }
        }
        onChange && onChange(allValues, changedValues)
      }
      render() {
        const { hook, ...props } = this.state
        return (
          <WrappedComponent { ...props } onChange={this.onChange} />
        )
      }
    }
  }
}
