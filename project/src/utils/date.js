import moment from 'moment'

export default {
  ranges: {
    'Today': [moment().startOf(), moment().endOf()],
    'Yestoday': [moment().subtract(1, 'days').startOf(), moment().subtract(1, 'days').endOf('days')],
    'Last 7 Days': [moment().subtract(7, 'days').startOf(), moment().endOf('days')],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(30, 'days').startOf(), moment().endOf('days')],
    'This Year': [moment().startOf('year'), moment().endOf('year')],
  }
}