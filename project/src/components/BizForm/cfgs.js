
import { Input, Checkbox, Button, DatePicker, TextArea, InputNumber } from 'antd'
import moment from 'moment'
import { Select, Search, InputSelect, Verification, Text, Upload } from './widget'
/**
 * @description Filter widget 配置列表 可自行扩展
 * @param component widget 可装饰的 React 组件 
 * @param suggest 双向数据绑定的默认配置
 * @param props 渲染widget组件的 默认属性配置
 */
export const componentGC = {
  Input: {
    component: Input,
  },
  InputSelect: {
    component: InputSelect,
  },
  InputNumber: {
    component: InputNumber,
    props: {
      style: { width: '100%' }
    }
  },
  RangePicker: {
    component: DatePicker.RangePicker,
    initialValue: [moment().subtract(7, 'days').startOf(), moment().endOf('days')],
    suggest: {
      getValueFromEvent: date => date.map((m, i) => i === 1 ? m.hour(23).minute(59).second(59) : m.hour(0).minute(0).second(0))
    },
    props: {
      ranges: {
        'Today': [moment().startOf(), moment().endOf()],
        'Yestoday': [moment().subtract(1, 'days').startOf(), moment().subtract(1, 'days').endOf('days')],
        'Last 7 Days': [moment().subtract(7, 'days').startOf(), moment().endOf('days')],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(30, 'days').startOf(), moment().endOf('days')],
        'This Year': [moment().startOf('year'), moment().endOf('year')],
      }
    }
  },
  DatePicker: {
    component: DatePicker
  },
  Select: {
    component: Select
  },
  Search: {
    component: Search
  },
  TextArea: {
    component: Input.TextArea
  },
  Verification: {
    component: Verification
  },
  Button: {
    component: Button,
    suggest: {},
    props: {}
  },
  Checkbox: {
    component: Checkbox,
    suggest: {
      valuePropName: 'checked'
    }
  },
  Text: {
    component: Text,
  },
  Upload: {
    component: Upload
  }
}

// 表单组件内置验证规则列表配置
export const scheme = {
  email: v => /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(v), // eslint-disable-line no-control-regex
  password: v => /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(v),
  url: v => /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(v),
}