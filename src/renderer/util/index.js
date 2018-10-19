
export const isObject = function (obj) {
  return obj !== null && typeof obj === 'object'
}

export const merge = function (target, obj) {
  if (isObject(obj)) {
    Object.keys(target).map(key => {
      if (obj.hasOwnProperty(key)) {
        target[key] = obj[key]
      }
    })
    return target
  } else {
    console.error(`param must be an object`)
  }
}
