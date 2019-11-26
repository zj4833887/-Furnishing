import { HOSTNAME } from './base.js';
// let { HOSTNAME } = require('./base.js')
function api(url, method, data = {}) {
  let contentType = method.toUpperCase() == 'POST' ? 'application/x-www-form-urlencoded' : 'applicayion/json'
  return new Promise((resole, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'Content-type': contentType,
      },
      dataType: 'json',
      success: (res) => {
        resole(res.data)
      }

    })
  })
}

function _get(url, data) {
  return api(HOSTNAME + url, 'GET', data)
}

function _post(url, data) {
  return api(HOSTNAME + url, 'POST', data)
}

module.exports = { _get, _post }