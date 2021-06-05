import { useEffect, useState } from 'react';

/**
 * 判断undefined，null为空时可能出现有效值0的情况
 * !!value：获取布尔值
 * @param {*} value 
 * @returns Boolean
 */

//  unknown不能赋值给任何类型，也不能调用任何方法
export const isFalsy = (value: unknown) => value === 0 ? false : !value

/**
 * 清空Object中空值
 * @param {*} object 
 * @returns Object
 */
export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    //@ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      //@ts-ignore
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
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn()
  }, [])
}

/**
 * debounce函数（js）
 * @param {*} func 
 * @param {*} delay 
 * @returns Function
 */
// const debounce = (func, delay) => {
//   let timeout
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(function () {
//       func(...param)
//     }, delay)
//   }
// }

// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，
// 而在使用的时候再指定类型的一种特性。
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次value变化后，设置一定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一次useEffect处理完以后执行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
