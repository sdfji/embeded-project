
const request = require('request')
const url = require('url')

const { SERVER } = require('./config')

module.exports = function(method, uri, params) {
  return new Promise((resolve, reject) => {
    const uriText = url.resolve(SERVER, uri)
    const option = {
	url: uriText,
	form: params,
    }

    request[method](option, (err, res) => {
      if (err) reject(err)
      else resolve(res.body)
    })
  })
}
