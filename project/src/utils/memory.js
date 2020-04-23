export default {
  pushUser: (obj = {}) => {
    localStorage.setItem(`net-${window.g_platform}:user`, JSON.stringify(obj))
  },
  pullUser: (key) => {
    let json = localStorage.getItem(`net-${window.g_platform}:user`)
    return JSON.parse(json)
  },
  getToken: () => {
    let json = localStorage.getItem(`net-${window.g_platform}:user`)
    let info = JSON.parse(json) || {}
    return info.authorization
  },
  pushCrumb: (obj = {}) => {
    localStorage.setItem(`net-${window.g_platform}:crumb`, JSON.stringify(obj))
  },
  pullCrumb: () => {
    let json = localStorage.getItem(`net-${window.g_platform}:crumb`)
    return JSON.parse(json)
  },
  clear: () => {
    localStorage.removeItem(`net-${window.g_platform}:crumb`)
    localStorage.removeItem(`net-${window.g_platform}:user`)
  },
  pushCfgs: (obj = {}) => {
    localStorage.setItem(`net-${window.g_platform}:cfgs`, JSON.stringify(obj))
  },
  pullCfgs: () => {
    let json = localStorage.getItem(`net-${window.g_platform}:cfgs`)
    return JSON.parse(json)
  }
}