import path from 'path'
import fs from 'fs'
import plugins from './plugins.config'
import routes from './router.config'
import theme from './theme.config'

export default {
  plugins,
  routes,

  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  disableCSSModules: true,
  hash: true,
  // theme
  devServer: {
    proxy: {
      '/netapi': {
        target: 'http://netapi.esmtong.cn/',
        pathRewrite: { '^/netapi' : '' },
        changeOrigin: true,
      }
    }
  }
}