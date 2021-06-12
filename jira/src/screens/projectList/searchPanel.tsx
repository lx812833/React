import { Input, Select, Form } from 'antd';
export interface User {
  id: string,
  name: string,
  personId: number,
  organization: string,
  token: string
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return <Form layout="inline" style={{ marginBottom: '2rem' }}>
    <Form.Item>
      {/* useState 不会自动合并更新对象。可以用函数式的 setState 结合扩展运算符来达到合并更新对象的效果。 */}
      <Input type="text" placeholder="项目名" value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value
      })} />
    </Form.Item>
    <Form.Item>
      <Select placeholder="负责人" style={{ width: 120 }} value={param.personId} onChange={value => setParam({
        ...param,
        personId: value
      })}>
        {
          users.map((res: User) => (
            <Select.Option key={res.id} value={res.id}>
              {res.name}
            </Select.Option>
          ))
        }
      </Select>
    </Form.Item>
  </Form>
}