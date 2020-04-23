const basicFormat = (ops, cfgs) => ({
  affiliate_id: ops.affiliate_id,
  affiliate_name: ops.affiliate_name,
  address1: ops.address1,
  address2: ops.address2,
  city: ops.city,
  country_id: ops.country_id,
  first_name: ops.first_name,
  last_name: ops.last_name,
  email: ops.email,
  phone: ops.phone,
  status: cfgs['OFFER_STATUS'][ops.status],
  manager_id: ops.manager_id,
})

const billingFormat = (ops, cfgs) => ({
  address1: ops.address1,
  address2: ops.address2,
  city: ops.city,
  Country: ops.Country,
  region_id: ops.region_id,
  zip_code: ops.zip_code,
  payment_method: ops.payment_method,
  beneficiary_name: ops.beneficiary_name,
  bank_name: ops.bank_name,
  swift_number: ops.swift_number,
  account_number: ops.account_number,
  billing_frequency: String(cfgs['BILLING_FREQUENCY'][ops.billing_frequency]),
  other_detail: ops.other_detail,
})

// 编辑
const onSubmitEdit = _this => {
  const getFormValues = name => _this[name].props.form.getFieldsValue()
  const { editTable } = _this.props
  const values = getFormValues('domainTable')
  const basic = getFormValues('basic')
  const billing = getFormValues('billing')
  const domain_list = getFormValues('offer')

  // Domain 表格参数
  const offer_list = Object.values(values).map((vl, key) => {
    editTable[key]['default_payout'] = vl
    return editTable[key]
  })

  const affiliate_detail = {
    address1: basic.address1,
    address2: basic.address2,
    affiliate_id: basic.affiliate_id,
    affiliate_name: basic.affiliate_name,
    city: basic.city,
    country_id: basic.country_id,
    phone: basic.phone,
  }

  const user_defail = {
    email: basic.email,
    first_name: basic.first_name,
    last_name: basic.last_name,
    status: basic.status,
    manager_id: basic.manager_id,
  }

  const billing_defail = {
    address1: billing.address1,
    address2: billing.address2,
    city: billing.city,
    country_id: billing.country_id,
    region_id: billing.region_id,
    zip_code: billing.zip_code,
    payment_method: billing.payment_method,
    beneficiary_name: billing.beneficiary_name,
    bank_name: billing.bank_name,
    swift_number: billing.swift_number,
    account_number: billing.account_number,
    billing_frequency: billing.billing_frequency,
    other_detail: billing.other_detail,
  }

  return {
    affiliate_detail,
    billing_defail,
    offer_settings: {
      offer_list,
      domain_list,
    },
    user_defail
  }
}

export {
  basicFormat,
  billingFormat,
  onSubmitEdit,
}