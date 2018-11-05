const _toString = Object.prototype.toString

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function merge (target, obj) {
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

export function deepClone (val) {
  if (isPlainObject(val)) {
    const res = {}
    for (const key in val) {
      res[key] = deepClone(val[key])
    }
    return res
  } else if (Array.isArray(val)) {
    return val.slice()
  } else {
    return val
  }
}
