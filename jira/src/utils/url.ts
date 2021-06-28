import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { subset, cleanObject } from 'utils/index';

/**
 * 
 * @param keys 
 * @returns 返回页面url中指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    /**
     * useMemo：返回一个memoized值
     * 把创建函数和依赖项数组作为参数传入useMemo，它仅会在某个依赖项改变时才重新计算memoized值。
     * 这种优化有助于避免在每次渲染时都进行高开销的计算。
     */
    useMemo(() =>
      subset(Object.fromEntries(searchParams), keys) as {
        [key in K]: string;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};

/**
 * Object.fromEntries()：方法把键值对列表转换为一个对象。
 * 通过 Object.fromEntries， 可以将 Map 转换为 Object:
 * 
 * const entries = new Map([
 *  ['foo', 'bar'],
 *  ['baz', 42]
 * ]);
 * 
 * const obj = Object.fromEntries(entries);
 * console.log(obj);
 * expected output: Object { foo: "bar", baz: 42 }
 */

/**
 * as const： 返回最原始类型
 *
 * const test = ['jack', 12, { gender: 'male' }]
 * // (string | number | { gender: string })[]
 * 
 * const test = ['jack', 12, { gender: 'male' }] as const
 * // readonly ["jack", 12, { readonly gender: "male" }
 */

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit
    return setSearchParam(o)
  }
}
