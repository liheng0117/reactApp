import { decorator, formatLocale } from '@/utils'
import Link from 'umi/link'
const { funHook, eventHook } = decorator
const PLANTFORM = funHook(({ app }) => app.platform)()
const icon = (type) => {
  return <i className={`iconfont icon-${type}`}/>
}
export const DROPWODOWN = [
  {
    key: 'user',
    children: <Link to='/account'>{icon('user')} {formatLocale('common.center')}</Link>,
    hide: PLANTFORM === 'backend'
  },
  {
    key: 'billing',
    children: <Link to='/account/billing'>{icon('user')} {formatLocale('user.billing')}</Link>,
    hide: PLANTFORM === 'backend'
  },
  {
    key: 'email',
    children: <a href='mailto:wang_chaoju@126.com'>{icon('email')} {formatLocale('common.contactMg')}</a>,
    hide: PLANTFORM === 'backend'
  },
  {
    key: 'email',
    children: <Link to='/admin/modifyPwd'>{icon('user')} Password Reset </Link>,
    hide: !(PLANTFORM === 'backend')
  },
  {
    key: 'logout',
    children: eventHook(() => ({ 
      type: 'app/logout', payload: {  }
    }))(<span>{icon('power')} {formatLocale('common.logout')}</span>),
  }
]
