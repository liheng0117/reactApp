import { fm } from '@/utils'
export const PASSWORD_COLUMN = [
  { 
    label: formatLocale('user.register.label_password'),
    id: 'password', 
    type: 'Input', 
    verify: (data) => {
      let regex = RegExp(/^\S{6,16}$/)
      if(!regex.test(data)){
        return Promise.reject(formatLocale('common.setPassword'))
      }else{
        return Promise.resolve()
      }
    },
    required: formatLocale('common.enterPassword'), 
    props: {
      type: 'password'
    }
  },
  { 
    label: formatLocale('user.register.label_confirmPassword'),
    id: 'confirm_password', 
    type: 'Input', 
    verify: (data,result) => {
      if(data !== result.password){
        return Promise.reject(formatLocale('common.setCPassword'))
      }else{
        return Promise.resolve()
      }
    },
    required: formatLocale('common.enterCPassword'), 
    props: {
      type: 'password'
    }
  },
]
