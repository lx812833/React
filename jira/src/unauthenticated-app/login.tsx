import { useAuth } from 'context/authContext';
import { Form, Input, Button } from 'antd';

export const LoginScreen = () => {
  const { login } = useAuth()

  const handleSubmit = (values: { username: string, password: string }) => {
    login(values)
  }

  return <Form labelAlign={'left'} onFinish={handleSubmit}>
    <Form.Item
      label="用户名"
      name="username"
      rules={[{ required: true, message: '请输入用户名!' }]}
    >
      <Input type="text" id="username" placeholder={"用户名"} />
    </Form.Item>
    <Form.Item
      label="密码"
      name="password"
      rules={[{ required: true, message: '请输入密码!' }]}
    >
      <Input type="password" id="password" placeholder="密码" />
    </Form.Item>
    <Form.Item style={{textAlign: "center"}}>
      <Button type="primary" htmlType="submit">登录</Button>
    </Form.Item>
  </Form>
}