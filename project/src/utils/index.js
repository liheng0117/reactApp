import { formatMessage } from 'umi-plugin-locale'

// 第三方工具库
export pathToRegexp from 'path-to-regexp'
export moment from 'moment'
export qs from 'qs'
export _ from 'lodash'
export MD5 from 'blueimp-md5'
export numeral from 'numeral'
export cs from 'classnames'

// 自定义工具库
export uuid from './uuid'
export is from 'is_js'
export date from './date.js'

export fm from './fm'
export tools from './tools'
export decorator from './decorator'
export motor from './motor'
export memory from './memory'
export const formatLocale = (id, rest = {}) => formatMessage({ id }, {...rest})
