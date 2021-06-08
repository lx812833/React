import { useState } from 'react';
import { LoginScreen } from 'unauthenticated-app/login';
import { RegisterScreen } from 'unauthenticated-app/register';
import { Card, Button } from 'antd';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)

  return <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Card>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <div style={{ textAlign: "center" }}>
        <Button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? '登录' : '注册'}
        </Button>
      </div>
    </Card>
  </div>
}