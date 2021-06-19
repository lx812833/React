import { Popover, Typography, List, Divider, Button } from 'antd';
import { useProjects } from 'components/project';
import styled from '@emotion/styled';

export const ProjectPopover = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  const { data: projectList } = useProjects()
  const pinnedProjects = projectList?.filter(item => item.pin)

  const content = <Container>
    <Typography.Text type="secondary">收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(item => <List.Item key={`${item.name}_${item.id}`}>
          <List.Item.Meta title={item.name} key={item.id} />
        </List.Item>)
      }
    </List>
    <Divider />
    <Button type="link" onClick={() => props.setProjectModalOpen(true)} style={{ padding: 0 }}>创建项目</Button>
  </Container>

  return <Popover placement="bottom" content={content}>
    <span>项目</span>
  </Popover>
}

const Container = styled.div`
  min-width: 30rem;
`