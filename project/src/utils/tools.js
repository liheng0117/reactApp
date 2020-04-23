/**
 * 填充 Filter
 * @param {key} 页面 Filter 前缀 
 * @param {filter} Filter 对象 
 * @param {cfgs} cfgs 对象 
 */
const getFilter = ({ key, filter, cfgs }) => (
  filter.map(ft => {
    const label = ft.label.toUpperCase()
    const option = cfgs[label ? `${key}_${label}` : label]
    if (option) {
      ft.options = []
      for (let [value, name] of Object.entries(option)) {
        ft.options.push({ value, name })
      }
    }
    return ft
  })
)

const serializeOptions = (option = {}, cfgs = {}) => {
  let { name, value, id, fKey } = cfgs
  return Object.keys(option).reduce((args, key) => {
    let item = {
      name: typeof option[key] === 'object' && name ? option[key][name] : option[key],
      value: typeof option[key] === 'object' && value ? String(option[key][value]) : String(key)
    }
    return id && fKey ? (option[key][fKey] == id ? [...args, item] : args) : [...args, item]
  }, [])
}

const conversionObj = (arr, name = 'id') => {
  let obj = {}
  arr.map( _ => obj[_[name]] = _)
  return obj
}
export const clearPersist = () => {
  localStorage.removeItem(`${window.g_platform}:authorization`)
  // localStorage.removeItem(`persist:${window.g_platform}`)
}
export const invertKeyValues = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[obj[key]] = key;
    return acc;
  }, {})
}

export default {
  serializeOptions,
  getFilter,
  clearPersist,
  conversionObj,
  invertKeyValues
}