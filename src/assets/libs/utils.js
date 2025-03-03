/**
 * 获取页面列表最大行数，避免滚动条
 * @param offsetHeight
 * @returns {number}
 */
export function getPageSize (offsetHeight) {
  const pageHeight = document.documentElement.clientHeight - 220 - (offsetHeight || 0)
  let pageRows = parseInt(pageHeight / 33)
  pageRows = pageRows || 20
  return pageRows
}

/**
 * 获取页面高度
 * @param offsetHeight
 * @returns {number}
 */
export function getPageHeight (offsetHeight) {
  if (isNaN(offsetHeight)) {
    offsetHeight = 0
  }
  const pageHeight = document.documentElement.clientHeight - (120 + Number(offsetHeight))
  return pageHeight
}

/**
 * 拷贝对象
 * @param obj
 * @returns {*[] | Function | {} | *}
 */
export function clone (obj) {
  let temp = null
  if (obj instanceof Array) {
    temp = obj.concat()
  } else if (obj instanceof Function) {
    temp = obj
  } else {
    temp = {}
    for (const item in obj) {
      const val = obj[item]

      temp[item] = typeof val === 'object' ? clone(val) : val
    }
  }
  return temp
}

/**
 * 深度拷贝
 * @param obj
 * @returns {*}
 */
export function deepCopy (obj) {
  const result = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

/**
 * 检查数据类型
 * @param val
 * @returns {array/object/date/number/string}
 */
export function objType (val) {
  if (!val) {
    return null
  } else if (val instanceof Array) {
    return 'array'
  } else if (val instanceof Object) {
    return 'object'
  } else if (val instanceof Date) {
    return 'date'
  } else if (val instanceof Number) {
    return 'number'
  } else if (typeof (val) === 'string') {
    return 'string'
  }
}

/**
 * 流量格式
 * @param flow
 * @returns {{flow: any, unit: *}}
 */
export function formatFlow (flow) {
  flow = isNaN(flow) || !flow ? 0 : Number(flow)
  let unit
  if (flow / 1024 < 1) {
    flow = flow.toFixed(1)
    unit = 'B'
  } else if (flow / 1024 / 1024 < 1) {
    flow = (flow / 1024).toFixed(1)
    unit = 'KB'
  } else if (flow / 1024 / 1024 / 1024 < 1) {
    flow = (flow / 1024 / 1024).toFixed(1)
    unit = 'MB'
  } else if (flow / 1024 / 1024 / 1024 / 1024 < 1) {
    flow = (flow / 1024 / 1024 / 1024).toFixed(1)
    unit = 'GB'
  }
  flow = flow % 1.0 === 0 ? parseInt(flow) : flow
  return { flow: flow, unit: unit }
}

/**
 * 字符串转16进制
 * @param str
 * @returns {string}
 */
export function strToHex (str) {
  if (str === '') {
    return ''
  }
  const hexCharCode = []
  hexCharCode.push('0x')
  for (let i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16))
  }
  return hexCharCode.join('')
}

/**
 * 16进制转字符串
 * @param hexCharCodeStr
 * @returns {string}
 */
export function hexToStr (hexCharCodeStr) {
  const trimedStr = hexCharCodeStr.trim()
  const rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
  const len = rawStr.length
  if (len % 2 !== 0) {
    alert('Illegal Format ASCII Code!')
    return ''
  }
  let curCharCode
  const resultStr = []
  for (let i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16) // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode))
  }
  return resultStr.join('')
}

/**
 * 获取指定范围N个随机数
 * @param min
 * @param max
 * @param size
 * @returns {Array}
 */
export function randomVal (min, max, size) {
  const result = []
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1) + min))
  }
  return result
}
