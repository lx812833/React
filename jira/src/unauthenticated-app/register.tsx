import { useAuth } from 'context/authContext';
import { Form, Input, Button } from 'antd';

export const RegisterScreen = () => {
  const { register } = useAuth()

  const handleRegister = (values: { username: string, password: string }) => {
    register(values)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  return <Form {...formItemLayout} labelAlign={'right'} onFinish={handleRegister}>
    <Form.Item
      label="用户名"
      name="username"
      rules={[{ required: true, message: '请输入用户名!' }]}
    >
      <Input type="text" id="username" placeholder="用户名" />
    </Form.Item>
    <Form.Item
      label="密码"
      name="password"
      rules={[{ required: true, message: '请输入密码!' }]}
    >
      <Input type="password" id="password" placeholder="密码" />
    </Form.Item>
    <Form.Item style={{ textAlign: "center" }}>
      <Button type="primary" htmlType="submit">注册</Button>
    </Form.Item>
  </Form>
}