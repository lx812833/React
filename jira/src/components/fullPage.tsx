import { Spin, Typography } from 'antd';
import styled from '@emotion/styled';
import { DevTools } from 'jira-dev-tool';

export const FullPageLoading = () => {
  return <FullPage>
    <Spin size="large"></Spin>
  </FullPage>
}

export const FullPageError = ({ error }: { error: Error | null }) => {
  return <FullPage>
    <DevTools />
    <ErrorTypography error={error} />
  </FullPage>
}

// 类型守卫
const isError = (value: any): value is Error => value?.message
export const ErrorTypography = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error?.message}</Typography.Text>
  }
  return null
}

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`