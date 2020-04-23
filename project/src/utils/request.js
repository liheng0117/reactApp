import axios from 'axios'
import { moment, uuid, pathToRegexp, memory } from './'
import { message } from '@/components'
let CancelToken = axios.CancelToken // 创建取消令牌

window.REQUEST_LIST = [] // 创建所有请求表

// // 添加统一拦截请求器
axios.interceptors.request.use(config => {
  config.cancelToken = new CancelToken(c => {
    window.REQUEST_LIST.push({
      url: config.url,
      cancel: c
    })
  })
  return config
}, error => {})

axios.interceptors.response.use(response=>{
  return response
}, error => {
  return Promise.reject(error)
})

function downloadData(response) {
  let { data, headers } = response
  let contentType = headers['content-type']
  let disposition = headers['content-disposition']
  let filename = disposition.slice(disposition.indexOf('=') + 1, disposition.length)
  let file = new Blob([data], { contentType })
  let a = document.createElement("a")
  let url = URL.createObjectURL(file)
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}
export default function request(endpoint, payload = {}) {
  const { request_action, filename } = payload
  const authorization = memory.getToken()
  let others 
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      baseURL: '/netapi',
      url: endpoint,
      headers: {
        'Authorization': authorization || '',
        'request_id': `${moment().unix()}-${uuid(8, 16)}`,
        'Accept': 'application/json',
      },
      responseType: request_action ? 'blob' : 'json',
      data: payload
    })
    .then(response => {
      const data = response.data
      if(request_action){
        downloadData(response)
      }
      if (data.code === 200) {
        resolve(data.result)
      } else {
        reject(data) 
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const download = function (fileUrl, filename) {
 let regexp = pathToRegexp('*/:key').exec(fileUrl)
 let key = regexp[2]
  axios({
    url: `/get_file/${key}/test`,
    baseURL: '/netapi/',
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
  })
  .catch(() => {
    message.error('download failed')
  })
}