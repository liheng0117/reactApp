import '@/styles/common.less'
import './styles.less'
import React, { PureComponent } from 'react'
import Postbacks from './postbacks'
import GlobalPostback from './globalPostback'
import { Tabs } from '@/components'

const { TabPane } = Tabs

export default class extends PureComponent {
  onSubmit = options => {
    console.log( options )
  }

  onCallback = () => {

  }

  render () {
    return (
      <Tabs defaultActiveKey="1" onChange={this.onCallback} className="postbacks-box">
        <TabPane tab="Postbacks" key="1">
          <Postbacks />
        </TabPane>
        <TabPane tab="Global Postback" key="2">
          <GlobalPostback />
        </TabPane>
      </Tabs>
    )
  }
}
