import { useEffect, useState, useRef } from 'react';

/**
 * 判断undefined，null为空时可能出现有效值0的情况
 * !!value：获取布尔值
 * @param {*} value 
 * @returns Boolean
 */

//  unknown不能赋值给任何类型，也不能调用任何方法
export const isFalsy = (value: unknown) => value === 0 ? false : !value
// isVoid 判断值是否有意义
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

/**
 * 清空Object中空值
 * @param {*} object 
 * @returns Object
 */
// object: { [key: string]: unknown } 键值对类型
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
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
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// 设置网页title
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
    // 依赖项被更改时，重复执行
  }, [title])

  useEffect(() => {
    // 组件卸载时执行
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
    // 当依赖项为有多个值的数组时，会比较每一个值，有一个不相等就执行
  }, [keepOnUnmount, oldTitle])
}

/**
 * 
 * @returns 重置路由
 */
export const resetRouter = () => window.location.href = window.location.origin

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 返回组件的挂载状态，如果还没挂载或已经卸载，返回false；反之，返回true
 */

export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    // 页面加载完调用
    mountedRef.current = true
    return () => {
      // useEffect返回一个函数，页面卸载时触发
      mountedRef.current = false
    }
  })

  return mountedRef
}