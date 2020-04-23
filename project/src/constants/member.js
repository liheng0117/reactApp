import { formatLocale, moment, motor } from '@/utils'
import { Switch } from '@/components'
import Link from 'umi/link'

const COLUMNS = [
  { title: formatLocale('member.list.columns.id'), dataIndex: 'admin_id', sorter: true, width: 80 },
  { title: formatLocale('member.list.columns.email'), dataIndex: 'email', sorter: true, width: 200 },
  { title: formatLocale('member.list.columns.role'), dataIndex: 'role_id', sorter: true, width: 120,
    render: v => v && motor(v).format('role')
  },
  { title: formatLocale('member.list.columns.status'), dataIndex: 'admin_status', sorter: true, width: 80, 
    render: (v, d, k) => <Switch checked={v === 1} onChange={() => motor('member/fetchUpdate').emitter({d,k})}/>
  },
  { title: formatLocale('member.list.columns.date'), dataIndex: 'create_time', sorter: true, width: 140,
    render: v => v && moment.unix(v).format('LLL'),
  },
  { 
    title: formatLocale('member.list.columns.action'), key: 'action', width: 80,
    render: (record, data) => <Link to={`/admin/member/${data.admin_id}/edit`}>{formatLocale('common.edit')}</Link>
  },
]
const FILTER = [
  {
    id: 'email',  // 后台参数
    label: formatLocale('member.list.columns.email'),  // 表头名字
    type: 'Search', // 表单类型
    props: {
      placeholder: formatLocale('member.list.columns.email'),
      onSearch: value => motor('app/fetchSearch').emitter({ 
        field: 'admin_email', 
        value, 
        _v: 'admin_email', 
        _n: 'admin_email'
      })
    }
  },
  {
    id: 'role_id',  // 后台参数
    label: formatLocale('member.list.columns.role'),  // 表头名字
    type: 'Select', // 表单类型
    placeholder: formatLocale('member.list.columns.role'),
    option: motor('role').valueOf(),
  },
  {
    id: 'admin_status',  // 后台参数
    label: formatLocale('member.list.columns.status'),  // 表头名字
    type: 'Select', // 表单类型
    placeholder: formatLocale('member.list.columns.status'),
    option: motor('affiliate_status').valueOf(),
  },
  {
    id: 'date',  // 后台参数
    label: formatLocale('member.list.columns.date'),  // 表头名字
    type: 'RangePicker',
    initialValue: [moment().startOf('year'), moment().endOf('year')],
    onPull: v => v.map(m => m.unix()),
    onPush: v => v && v.map(t => moment.unix(Number(t)))
  }
]
export {
  COLUMNS,
  FILTER
}