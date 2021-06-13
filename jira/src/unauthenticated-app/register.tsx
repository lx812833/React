import { useAuth } from 'context/authContext';
import { Form, Input } from 'antd';
import { LongButton } from './index';
import { useAsync } from 'utils/useAsync';

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth()
  const { handleRunPromise, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleRegister = ({ confirm, ...values }: { username: string, password: string, confirm: string }) => {
    if (confirm !== values.password) {
      onError(new Error("请确认两次输入密码相同"))
      return
    }
    handleRunPromise(register(values)).catch(error => {
      onError(error)
    })
  }

  return <Form onFinish={handleRegister}>
    <Form.Item
      name="username"
      rules={[{ required: true, message: '请输入用户名!' }]}
    >
      <Input type="text" id="username" placeholder="用户名" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: '请输入密码!' }]}
    >
      <Input type="password" id="password" placeholder="密码" />
    </Form.Item>
    <Form.Item
      name="confirm"
      rules={[{ required: true, message: '请重新输入密码!' }]}
    >
      <Input type="password" id="confirm" placeholder="确认密码" />
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} type="primary" htmlType="submit">注册</LongButton>
    </Form.Item>
  </Form>
}