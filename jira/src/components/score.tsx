import React from 'react';
import { Rate } from 'antd';

// 获取Rate组件的 props 类型声明
interface RateProps extends React.ComponentProps<typeof Rate> {
  checked: boolean,
  onCheckedChange?: (checked: boolean) => void
}

export const Score = (props: RateProps) => {
  const { checked, onCheckedChange, ...otherProps } = props
  return <Rate
    count={1}
    value={checked ? 1 : 0}
    onChange={num => onCheckedChange?.(!!num)}
    {...otherProps}
  />
}