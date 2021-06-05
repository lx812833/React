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