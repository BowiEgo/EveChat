'use strict'

exports.common = async (ctx, next) => {
  const codeMap = {
    '-1': 'fail',
    '200': 'success',
    '401': 'token expired',
    '500': 'sever error',
    '10001': 'params error',
  }

  ctx.util = {
    resuccess ({data, message}) {
      return {
        code: 200,
        success: true,
        message: message || codeMap['200'],
        data: data || null
      }
    },
    refail ({data, code, message}) {
      return {
        code: code || -1,
        success: false,
        message: message || codeMap[code || '-1'],
        data: data || null
      }
    }
  }
  await next()
}