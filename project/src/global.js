import moment from 'moment'
import moment_timezone from 'moment-timezone'
moment.locale('en', {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  longDateFormat : {
    LT : "HH:mm",
    LTS : "HH:mm:ss",
    L : "D",
    LL : "D MMMM",
    LLL : "D MMMM, YYYY",
    LLLL : "D MMMM, YYYY LT",
  }
})
moment_timezone.locale('en', {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  longDateFormat : {
    LT : "HH:mm",
    LTS : "HH:mm:ss",
    L : "D",
    LL : "D MMMM",
    LLL : "D MMMM, YYYY",
    LLLL : "D MMMM, YYYY LT",
  }
})