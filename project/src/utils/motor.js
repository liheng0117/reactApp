
class Motor {
  constructor(value) {
    const { getState, dispatch } = window.g_app._store
    this.getState = getState
    this.value = value
    this.dispatch = dispatch
    this.state = this.deepGet(getState(), 'cfgs', {})
  }
  unique(str = 'app') {
    let path = this.value ? `${str}.${this.value}` : str
    return this.deepGet(this.getState(), path, undefined)
  }
  format(path = '', defaultValue = undefined) {
    path = path.search('%') !== -1 ? path.replace('%', this.value) : `${path}.${this.value}`
    this.value = this.deepGet(this.state, path, defaultValue)
    return this.value 
  }
  valueOf(pattern, defaultValue = undefined) {
    this.value = this.deepGet(this.state, this.value, {})
    this.value = Object.keys(this.value).map(key => {
      let item = this.value[key]
      return {
         value: key, 
         name: typeof pattern === 'string' ? this.deepGet(item, pattern, defaultValue) : item
        }
    })
    return this.value
  }

  emitter(payload) {
    return this.dispatch({ type: this.value ,payload })
  }
  // 深层取出对象值
  deepGet(object, path, defaultValue = undefined) {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
      .reduce((o, k) => (o || {})[k], object) || defaultValue;
  }
 
}

export default function (opt) {
  return new Motor(opt)
}