const path = require('path')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, 'components')
    return config
  },
})
