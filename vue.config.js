module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/img': {
        changeOrigin: true,
        target: 'http://127.0.0.1:8080'
      },
      '/book': {
        changeOrigin: true,
        target: 'http://127.0.0.1:8080'
      },
    }
  }
};
