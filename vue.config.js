const path = require('path')

module.exports = {
  /*
   * Dynamically resolves api-client based on env variable values.
   * Source: https://tahazsh.com/use-mock-data-in-vue
   */
  chainWebpack: config => {
    const apiClient = process.env.VUE_APP_API_CLIENT

    config.resolve.alias
      .set('api-client', path.resolve(__dirname, `src/services/api/${apiClient}`))
  }
}
