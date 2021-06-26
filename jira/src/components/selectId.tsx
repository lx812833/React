import { Select } from 'antd';
import React from 'react';

// 使用React.ComponentProps获取Select 的SelectProps属性
type SelectProps = React.ComponentProps<typeof Select>

// Omit: 忽略type中某个属性
interface SelectIdProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: string | number | null | undefined,
  onChange?: (value?: number) => void,
  defaultOptionName?: string
  options?: { name: string, id: number }[],
  width?: number
}

export const SelectId = (props: SelectIdProps) => {
  const { value, onChange, defaultOptionName, options, width, ...otherProps } = props
  return <Select value={options?.length ? handleToNumber(value) : 0} style={{ width }} {...otherProps} onChange={res => onChange?.(handleToNumber(res) || undefined)}>
    {
      defaultOptionName ? <Select.Option value={0} key="">{defaultOptionName}</Select.Option> : null
    }
    {
      options?.map(opt => (
        <Select.Option key={opt.id} value={opt.id}>
          {opt.name}
        </Select.Option>
      ))
    }
  </Select>
}

const handleToNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)