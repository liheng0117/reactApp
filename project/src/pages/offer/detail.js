import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { 
  Card, Table, ListView, Icon, BizIcon, Collapse, 
  Input, Operation, Row, Col, Button, Dialog, Sheet } from '@/components'
import PostBack from '@/components/PostBack' 
import { DETAIL_BAISC_COLUMNS, POSTBACKS_COLUMS, POSTBACKS_SHEET } from '@/constants/offer'
import { download } from '@/utils/request'
import { tools, _ } from '@/utils'
export default 
@connect(({ offer, app }) => ({
  data: offer[app.platform], // 取出某个平台的数据池
  platform: app.platform,
  cfgs: app.cfgs
}))
class extends PureComponent {
  constructor(props) {
    super(props)
  }
  
  onShowSubs = () => {
    const { dispatch, data, platform } = this.props
    dispatch({ type: 'offer/updateState', platform, payload: { visible: !data.visible }})
  }
  // offerPage 展开与折叠
  onCollapseChange = (activeKey) => {
    const { dispatch, platform } = this.props
    dispatch({ type: 'offer/updateState', platform, payload: { activeKey } })
  }
  // Offer Pages SubID 配置
  onInputBlur = (e, key) => {
    if (!!e.target.value) {
      const { dispatch } = this.props
      const payload = {
        [key]: e.target.value,
      };
      dispatch({ type: 'offer/setURL', payload })
    }
  }
  // 显示postback 添加框
  onShowPostback = () => {
    const { dispatch, platform } = this.props
    dispatch({
      type: 'offer/updateState',
      platform,
      payload: { postbackVisible: true }
    })
  }
  // 关闭postback 添加框
  onCancel = () => {
    const { dispatch, platform } = this.props
    dispatch({
      type: 'offer/updateState',
      platform,
      payload: { postbackVisible: false }
    })
  }
  // postback 添加保存
  onSubmitPostback = async () => {
    const { match, dispatch } = this.props
    let data = await this.formRef.getResult(1)
    let payload = { ...data, ...match.params }
    dispatch({ type: 'offer/fetchPostbackSave', payload })
  }
  onDowload = (e, item) => {
    e.stopPropagation()
    let { page_download_url, filename } = item
    page_download_url && download(page_download_url, filename)
  }
  onOpenTab = (e, item) => {
    e.stopPropagation()
    let element = document.createElement("a")
    element.setAttribute('href', item.url)
    element.setAttribute('target', '__blank')
    document.body.appendChild(element)
    element.click()
    setTimeout(() => {
      document.body.removeChild(element)
    }, 1000)
  }
  render() {
    const { data, cfgs } = this.props
    return (
      <>
        <Card 
          title={data.label}
          bordered={false} 
          bodyStyle={{ padding: 1}}
        >
          <Card 
            title="Basic Information"  
            bordered={false} 
            none-bordered="top"
          >
            <Table 
              rowKey="offer_id"
              columns={DETAIL_BAISC_COLUMNS}
              dataSource={data.basic}
              pagination={false}
            />
          </Card>
        </Card>
        <Card title="Offer Pages" data-margin="top">
          <Collapse
            activeKey={String(data.activeKey)}
            accordion 
            onChange={this.onCollapseChange}
          >
            {
              Array.isArray(data.pages) && data.pages.map(item => (
                <Collapse.Panel
                  key={item.offer_page_id}
                  header={item.name } 
                  showArrow={false}
                  extra={[
                    <Button key="a" type="link" onClick={e => this.onDowload(e, item)}>
                      <Icon type="download" />
                    </Button>,
                    <Button key="b" type="link" onClick={e => this.onOpenTab(e, item)}>
                      <BizIcon type="bounce" />
                    </Button>
                  ]}
                > 
                  <h4>Tracking URL</h4>
                  <Input 
                    value={item.tracking_url && item.tracking_url.replace(/(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/i, (m, c) => c ? m : `http://${m}`)} 
                    onDoubleClick={e => e.target.select()}
                  />
                </Collapse.Panel>
              ))
            }
          </Collapse>
          <Operation deploy={[{ name: 'Add Sub IDS', icon: 'plus', click: this.onShowSubs}]} />
          <Row gutter={12} style={{ display: data.visible ? 'block' : 'none' }}>
            {
              data.subs.map((item, idx) => (
                <Col key={idx} span={(idx + 1) % 3 === 0 ? 4 : 5}>
                  <span>{item.name}</span>
                  <Input onBlur={(e) => this.onInputBlur(e, item.key)}/>
                </Col>
              ))
            }
          </Row>
        </Card>
        <Card 
          title={[
            <span key="t" style={{ marginRight: '24px'}}>Postbacks</span>,
            <Button key="a" type="primary" icon="plus" onClick={this.onShowPostback}>Add New Postback</Button>
          ]} 
          data-margin="top"
        >
          <Table 
            rowKey="postback_id"
            columns={POSTBACKS_COLUMS}
            dataSource={data.postbacks}
            pagination={false}
          />
        </Card>
        <Dialog 
          width={908}
          title="Create Your Postbacks/iFrame Codes" 
          visible={data.postbackVisible}
          onOk={this.onSubmitPostback}
          onCancel={this.onCancel}
        >
          <PostBack 
            sheet={POSTBACKS_SHEET} 
            extra={['url_code']}
            ref={ref => this.formRef = ref}
          />
        </Dialog>
      </>
    )
  }
}