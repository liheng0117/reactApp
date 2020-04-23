export default [
  ['umi-plugin-react', {
    antd: false,
    dva: true,
    dynamicImport: { webpackChunkName: true },
    title: 'network',
    dll: true,
    locale: {
      enable: true,
      default: 'en-US',
    },
    routes: {
      exclude: [
        /models\//,
        /services\//,
        /model\.(t|j)sx?$/,
        /service\.(t|j)sx?$/,
        /components\//,
      ],
    },
  }]
]