
const request = require('./request')

request('get', '/security')
.then(body => console.log(body))
