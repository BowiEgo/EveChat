const cp = require('./cp')
const bcrypt = require('bcryptjs')

/**
 * 加密字符串
 * @param str
 */

exports.bhash = function (str) {
  return cp(bcrypt.hash, str, 8)
}

/**
 * 对比原字符串与经过加密的字符串是否相同
 * @param str
 * @param hash
 */
exports.bcompare = function (str, hash) {
  return cp(bcrypt.compare, str, hash)
}
