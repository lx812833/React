import { useEffect, useState } from 'react';

/**
 * 判断undefined，null为空时可能出现有效值0的情况
 * !!value：获取布尔值
 * @param {*} value 
 * @returns Boolean
 */

export const isFalsy = (value) => value === 0 ? false : !value

/**
 * 清空Object中空值
 * @param {*} object 
 * @returns Object
 */
export const cleanObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

/**
 * 页面加载完成后执行函数
 * @param {*} 自定义Hook Custom Hook
 * @returns Function
 */
export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

/**
 * debounce函数（js）
 * @param {*} func 
 * @param {*} delay 
 * @returns Function
 */
const debounce = (func, delay) => {
  let timeout
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      func(...param)
    }, delay)
  }
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次value变化后，设置一定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一次useEffect处理完以后执行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
