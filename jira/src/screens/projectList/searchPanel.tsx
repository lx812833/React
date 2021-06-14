import { Input, Form } from 'antd';
import { Project } from 'screens/projectList/list';
import { UserSelect } from 'components/user';
export interface User {
  id: number,
  name: string,
  personId: number,
  organization: string,
  token: string
}
interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, "name" | "personId">>,
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
      <UserSelect value={param.personId} onChange={value => setParam({
        ...param,
        personId: value
      })} defaultOptionName="负责人" width={120} />
    </Form.Item>
  </Form>
}