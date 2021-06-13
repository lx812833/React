import { useSearchParams } from 'react-router-dom';

/**
 * 
 * @param keys 
 * @returns 返回页面url中指点键的数值
 */
export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    keys.reduce((prev: {}, key: string) => {
      return { ...prev, [key]: searchParams.get(key) || "" }
    }, {} as { [key in string]: string }),
    setSearchParams
  ] as const
}

/**
 * as const： 返回最原始类型
 *
 * const test = ['jack', 12, { gender: 'male' }]
  // (string | number | { gender: string })[]
  const test = ['jack', 12, { gender: 'male' }] as const
  // readonly ["jack", 12, { readonly gender: "male" }
 *
 */
