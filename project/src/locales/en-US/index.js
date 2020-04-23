import dashboard from './dashboard'
import offer from './offer'
import affiliate from './affiliate'
import domain from './domain'
import user from './user'
import payouts from './payouts'
import member from './member'
import billing from './billing'
import postback from './postback'
import report from './report'

export default {
  'common.login': 'Log in',
  'common.signup': 'Sign up',
  'common.next': 'Next',
  'common.label.password': 'Password',
  'common.label.CPassword': 'Confirm Password',
  'common.label.OPassword': 'Origin Password',
  'common.enterEmail': 'Please enter your e-mail address',
  'common.enterPassword': 'Password cannot be empty',
  'common.enterNPassword': 'New password cannot be empty',
  'common.enterCPassword': 'Please confirm your password!',
  'common.enterToc': 'Please read the terms of services',
  'common.ph.email': 'E-mail',
  'common.ph.password': 'Password',
  'common.ph.confirmPassword': 'Confirm Password',
  'common.setPassword': 'Password must be between 6 and 16 characters.',
  'common.setCPassword': 'Two passwords that you enter is inconsistent!',
  'common.invalidEmail': 'The input is not valid E-mail!',
  'common.today': 'Today',
  'common.yesterday': 'Yesterday',
  'common.week': 'Last 7 Days',
  'common.month': 'Last 30 Days',
  'common.year': 'Last Year',
  'common.edit': 'Edit',
  'common.add': 'Add',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.changePassword': 'Change Password',
  'common.apply': 'Apply',
  'common.clear': 'Clear',
  'common.action': 'Action',
  'common.actions': 'Actions',
  'common.delete': 'Delete',
  'common.center': 'User Center',
  'common.logout': 'Log out',
  'common.contactMg': 'Contact Manager',
  ...user,
  ...dashboard,
  ...offer,
  ...affiliate,
  ...domain,
  ...payouts,
  ...member,
  ...billing,
  ...postback,
  ...report,
}
