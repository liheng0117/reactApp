import { formatLocale, motor } from '@/utils'
import { Icon } from '@/components'

export const OR_PASSWORD_COLUMN = [{
  label: formatLocale('common.label.OPassword'),
  id: 'origin_password', 
  type: 'Input',
  required: formatLocale('common.enterPassword'),  
  props: {
    type: 'password'
  }
}]
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
      autoComplete: 'off',
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
      autoComplete: 'off',
      type: 'password'
    }
  },
]
export const FORGET_PASSWORD = [
  { 
    id: 'email', 
    type: 'Input', 
    verify: ['email', formatLocale('common.invalidEmail')],
    required: formatLocale('common.enterEmail'),
    props: {
      prefix: <Icon type="mail-o" />,
      placeholder: formatLocale('common.ph.email')
    } 
  },
  // { 
  //   id: 'verificationCode', 
  //   type: 'Verification', 
  //   required: formatLocale('user.forget.enterVcode'), 
  //   props: {
  //     prefix: <i className='iconfont icon-security' ></i>,
  //     placeholder: formatLocale('user.forget.label.vcode'),
  //     url: '/get_captcha'
  //   } ,
  // },
]
export const REGISTER_SHEET = {
  ACCOUNT: [
    { 
      label: formatLocale('user.register.label_affiliate'),
      id: 'affiliate_name', 
      type: 'Input', 
      required: formatLocale('user.register.enterAffiliate'), 
    },
    { 
      label: formatLocale('user.register.label_invited_code'),
      id: 'invited_code', 
      type: 'Input', 
      required: formatLocale('user.register.enterInvited_code'), 
      verify: (data) => {
        if(data != '88888888'){
          return Promise.reject(formatLocale('user.register.invited_code_error'))
        }else{
          return Promise.resolve()
        }
      },
    },
    { 
      label: formatLocale('user.register.label_adress1'),
      id: 'address1', 
      type: 'Input', 
      required: formatLocale('user.register.enterAdress1'), 
    },
    { 
      label: formatLocale('user.register.label_adress2'),
      id: 'address2', 
      type: 'Input', 
    },
    { 
      label: formatLocale('user.register.label_city'),
      id: 'city', 
      type: 'Input',
      required: formatLocale('user.register.enterCity'), 
    },
    { 
      label: formatLocale('user.register.label_country'),
      id: 'country_id', 
      type: 'Select',
      option: motor('country').valueOf('en_name'),
      required: formatLocale('user.register.enterCountry'), 
      props: {
        showSearch: true,
        filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    },
    { 
      label: formatLocale('user.register.label_phone'),
      id: 'phone', 
      type: 'Input', 
      required: formatLocale('user.register.enterPhone'), 
    },
  ],
  USER: [
    { 
      label: formatLocale('user.register.label_email'),
      id: 'email', 
      type: 'Input', 
      verify: ['email', formatLocale('common.invalidEmail')],
      required: formatLocale('common.enterEmail'), 
      props: {
        autoComplete: 'off'
      }
    },
    PASSWORD_COLUMN[0],
    PASSWORD_COLUMN[1],
    { 
      label: formatLocale('user.register.label_firstName'),
      id: 'first_name', 
      type: 'Input', 
      required: formatLocale('user.register.enterFirstName'), 
    },
    { 
      label: formatLocale('user.register.label_lastName'),
      id: 'last_name', 
      type: 'Input', 
      required: formatLocale('user.register.enterLastName'), 
    },
    {
      id: 'checkbox',
      type: 'Checkbox',
      required: formatLocale('common.enterToc'), 
      props: {
        children: (
          <span> agree to the 
          <a target="_blank" 
            style={{ color: '#0099e8'}} href="https://www.baidu.com" rel="noopener noreferrer" >
            Terms and Conditions</a>
          </span>
        )
      }
    }
  ]
}
export const ACCOUNT_SHEET = {
  AFFILIATE: [
    { 
      label: formatLocale('user.register.label_affiliate'),
      id: 'affiliate_name', 
      type: 'Input', 
    },
    { 
      label: formatLocale('user.register.label_adress1'),
      id: 'address1', 
      type: 'Input', 
    },
    { 
      label: formatLocale('user.register.label_adress2'),
      id: 'address2', 
      type: 'Input', 
    },
    { 
      label: formatLocale('user.register.label_country'),
      id: 'country_id', 
      type: 'Select',
      option: motor('country').valueOf('en_name'),
      required: formatLocale('user.register.enterCountry'), 
      props: {
        showSearch: true,
        filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    },
    { 
      label: formatLocale('user.register.label_city'),
      id: 'city', 
      type: 'Input', 
    },
    { 
      label: formatLocale('user.register.label_phone'),
      id: 'phone', 
      type: 'Input', 
    },
  ],
  USER: [
    { 
      label: formatLocale('user.register.label_email'),
      id: 'email', 
      type: 'Input', 
      verify: ['email', formatLocale('common.invalidEmail')],
      required: formatLocale('common.enterEmail'), 
    },
    { 
      label: formatLocale('user.register.label_firstName'),
      id: 'first_name', 
      type: 'Input', 
      required: formatLocale('user.register.enterFirstName'), 
    },
    { 
      label: formatLocale('user.register.label_lastName'),
      id: 'last_name', 
      type: 'Input', 
      required: formatLocale('user.register.enterLastName'), 
    },
  ],
  TIMEZONE: [
    { 
      label: formatLocale('user.register.label_timezone'),
      id: 'timezone_id', 
      type: 'Select', 
      option: motor('timezone').valueOf('en_name'),
      props: {
        showSearch: true,
        filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    }
  ],
  BILLING: [
    { 
      label: formatLocale('user.billing.label_payment'),
      id: 'payment_method', 
      type: 'Input', 
      props: {
        disabled: true
      }
    },
    { 
      label: formatLocale('user.billing.label_beneficiary'),
      id: 'beneficiary_name', 
      type: 'Input', 
      props: {
        disabled: true
      }
    },
    { 
      label: formatLocale('user.billing.label_bank'),
      id: 'bank_name', 
      type: 'Input', 
      props: {
        disabled: true
      }
    },
    { 
      label: formatLocale('user.billing.label_swift'),
      id: 'swift_number', 
      type: 'Input',
      props: {
        disabled: true
      } 
    },
    { 
      label: formatLocale('user.billing.label_account'),
      id: 'account_number', 
      type: 'Input', 
      props: {
        disabled: true
      }
    },
    { 
      label: formatLocale('user.billing.label_billing'),
      id: 'billing_frequency', 
      type: 'Input', 
      props: {
        disabled: true
      }
    },
    { 
      label: formatLocale('user.billing.label_other'),
      id: 'other_detail', 
      type: 'Input', 
      props: {
        disabled: true
      }
    },
  ]
}