import React, { PureComponent } from 'react'
import './styles.less'
import { Row, Col, Table, Button, Sheet} from '../'
import { uuid } from '@/utils'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'center'
  }, {
    title: 'Label',
    dataIndex: 'label',
    align: 'center'
  }
]
const dataSource = [
  { name: '{ac}', label: 'ID of affiliate' },
  { name: '{oc}', label: 'ID of offer' },
  { name: '{pc}', label: 'ID of product sales page' },
  { name: '{td}', label: 'transaction ID of the conversion' },
  { name: '{subid1}', label: 'sub id 1' },
  { name: '{subid2}', label: 'sub id 2' },
  { name: '{subid3}', label: 'sub id 3' },
  { name: '{subid4}', label: 'sub id 4' },
  { name: '{subid5}', label: 'sub id 5' },
  { name: '{payout}', label: 'payout of the offer' }
]
export default class extends PureComponent {
  static defaultProps = {
    tableSize: 'small',
    leftSpan: 10,
    rightSpan: 14
  }
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.target = null
    this.state = {
      sheet: this.additionalProps(props),
      value: props.value || {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
      this.setState({
        value: nextProps.value
      })
    }
  }
  onFocus(e, id) {
    this.target = { id, element: e.target }
  }
  onBlur(e) {
    // this.target = null
  }
  onCell(rec, e) {
    if (!this.target) return
    const { element, id } = this.target
    if ( element.selectionStart !== 0 && element.selectionStart === element.selectionEnd) {
      const { value } = this.state
      const index = element.selectionStart
      const currStr = value[id]
      this.setState({
        value: {
          ...value,
          [id]: `${currStr.slice(0, index)}${rec.name}${currStr.slice(index, currStr.length)}`
        }
      }, () => {
        this.target.element.focus()
        this.target.element.setSelectionRange(index, rec.name.length + index)
        // this.target.element.selectionEnd = 
      })
    }
 
  }
  additionalProps(props) {
    const { extra = [], sheet } = props
    return sheet.map(item => extra.includes(item.id) ? {
      ...item, 
      props: {
        ...item.props,
        onFocus: e => this.onFocus(e, item.id),
        onBlur: e => this.onBlur(e)
      } 
    }: item)
  }
  onChange(value) {
    this.setState({
      value
    })
  }
  getResult() {
    return  this.formRef.getResult()
  }
  render() {
    const { sheet, value } = this.state
    const { rightSpan, leftSpan, tableSize } = this.props
    return (
      <Row gutter={12}>
        <Col span={leftSpan} style={{ paddingRight: '18px' }}>
          <Sheet
            layout="vertical"
            wrappedComponentRef={ref => this.formRef = ref}
            columns={sheet}
            value={value}
            onChange={this.onChange}
          />
        </Col>
        <Col span={rightSpan}>
          <div className="postback-title">
            <label className="postback-title__label"> Postback Parameters</label>
            <span className="postback-title__desc">Replace the relevant parameters in your postback url with the code below.</span>
          </div>
          <Table 
            className="postback-table"
            rowKey={() => uuid()}
            columns={columns} 
            dataSource={dataSource}
            size={tableSize}
            pagination={false}
            bordered={true}
            onRow={record => ({
              onClick: e => this.onCell(record, e)
            })}
          />
        </Col>
      </Row>
    )
  }
}