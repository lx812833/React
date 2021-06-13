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
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
}

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`