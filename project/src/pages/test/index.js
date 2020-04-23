/* eslint-disable */
import React, { PureComponent } from 'react'
import { Card, MultiSelect, Select, Switch, Tabs, Modal, Button, Sheet, Related } from '@/components'
const option = [
  { name: '汉皇重色思倾国', value: '1' },
  { name: '御宇多年求不得', value: '2' },
  { name: '杨家有女初长成', value: '3' },
  { name: '养在深闺人未识', value: '4' },
  { name: '一朝选在君王侧', value: '16' },
  { name: '天生丽质难自弃', value: '5' },
  { name: '回眸一笑百媚生', value: '6'},
  { name: '六宫粉黛无颜色', value: '7'},
  { name: '春寒赐浴华清池', value: '8'},
  { name: '温泉水滑洗凝脂', value: '9'},
  { name: '侍儿扶起娇无力', value: '10'},
  { name: '始是新承恩泽时', value: '11'},
  { name: '云鬓花颜金步摇', value: '12'},
  { name: '芙蓉帐暖度春宵', value: '13'},
  { name: '春宵苦短日高起', value: '14'},
  { name: '从此君王不早朝', value: '15'}
]
const dataSources = [
  { 
    label: '我是个输入框', 
    id: 'c0', 
    type: 'Text',
  }, 
  { 
    label: '我是个输入框', 
    id: 'a', 
    type: 'Input', 
    required: '你必须填写', 
    
    props: {
      placeholder: '正常输入框',
    }
  }, 
  { 
    label: '我是密码输入框', 
    id: 'c', 
    type: 'Input', 
    required: true, 
    verify: ['password', '你传入的密码格式不正确'],
    props: {
      placeholder: '输入密码框',
      type: 'password'
    }
  }, 
  {
    label: '我是下拉选择框',
    id: 'd',
    type: 'Input',
    onPull: (v) => {
      return v && `${v}-wjb`
    }
  }, 
  // {
  //   label: '我是checkbox选择框',
  //   id: 'e',
  //   type: 'Checkbox',
  //   required: true, 
  // }, 
  {
    label: '我是多文本输入框',
    id: 'name',
    type: 'Input',
    onPush: (v) => {
      return v + 1
    },
  }, 
  {
    label: '这是个组合框',
    id: 'h',
    type: 'InputGroup',
    onPull: (v) => {
      return v && v.map(d => d + 1)
    }
  }
]
const Demo = ({ label, children }) => {
  return (
    <div style={{ margin: '24px 0'}}>
      {label && <h4>{label}:</h4>}
      <div>{children}</div>
    </div>
  )
}
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  onSubmit = () => {
    this.formRef.getResult()
    .then(result => {
      console.log('我拿到了正确结果', result)
    })
    .catch(err => {
      console.log('错误的表单信息', err)
    })
  }
  render() {
    return (
      <>
        <Card>
          <Demo label="checkbox 下拉框（复选器）">
            <MultiSelect
              placeholder="复选器"
              defaultValue={['1', '2']}
              title="Select date to Include"
              option={option}
              onChange={v => { console.log('v', v)}}
            />
          </Demo>
          <Demo label="下拉框">
            <Related
              placeholder={['请选择省份', '请选择城市']}
              value={['1', '1-3']}
              option = {
                [{
                  name: '北京',
                  value: '1',
                  children: [
                    { name: '昌平', value: '1-2' },
                    { name: '海淀', value: '1-3' },
                    { name: '朝阳', value: '1-4' },
                    { name: '通州', value: '1-5' },
                    { name: '大兴', value: '1-6' },
                  ]
                },
                {
                  name: '河南',
                  value: '2',
                  children: [
                    { name: '郑州', value: '2-2' },
                    { name: '安阳', value: '2-3' },
                    { name: '洛阳', value: '2-4' },
                    { name: '濮阳', value: '2-5' },
                    { name: '开封', value: '2-6' },
                  ]
                }]
             }/>
          </Demo>
          {/* <Demo label="开关">
            <Switch defaultChecked />
          </Demo>
          <Demo label="tap切换">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
              </Tabs.TabPane>
              <Tabs.TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
              </Tabs.TabPane>
              <Tabs.TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
              </Tabs.TabPane>
            </Tabs>
          </Demo>
          <Demo label="弹出框"> 
            <Button type="primary" onClick={this.showModal}>
              Open Modal
            </Button>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </Demo>
          <Demo label="合成表单组件">
            <Sheet
              value={{
                a: '44444',
                name: '164',
                h: [1444444, 222]
              }}
              columns={dataSources} 
              wrappedComponentRef={ref => this.formRef = ref}
            />
            <Button type="primary" onClick={this.onSubmit}>
              获取表单内容
            </Button>
          </Demo> */}
        </Card>
      </>
    )
  }
}
/* eslint-disable no-new */