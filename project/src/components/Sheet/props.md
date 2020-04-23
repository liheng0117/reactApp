## Sheet 属性配置
```javascript
    <Sheet
      value={{}}
      columns={[
        {
           label: '标题',
           id: '唯一ID',
           type: 'Input',
           onPull: v => v, // 出栈数据 处理工具
           onPush: v => v // 入栈数据 处理工具
           option: [] // 部分type必须选项
           props: {}  // 继承基础组件的属性
        }
      ]}
      onChange={(allValues, value) => {}} // 表单值改变时回调
      disabled={['id'] || Boolean } //禁用某个 columns 配置 Boolean类型时作用于所有
      filter={(id, item) => Boolean } // 筛选器，可以通过返回的ID进行是否渲染该项
      wrappedComponentRef={ref => this.formRef = ref}
      // hook 钩子配置
      hook={{
        trigger: 'country_id', // 触发时机的ID配置，若果不传 则任意表单改变时都会触发，并且钩子函数返回有所值
        collect: 'description', // 收集 columns 的原始值ID配置，如果不传则钩子函数返回所有的项目
        onEvent: (triggerValue, collectColumns) => { // 钩子事件函数 为必传，返回值 为一个新的 columns，如果没有返回结果，则为旧属性
          return { ...collectColumns }
        }
      }}
    />
```
