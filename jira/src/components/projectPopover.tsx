import { Popover, Typography, List, Divider, Button } from 'antd';
import { useProjects } from 'components/project';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { projectListActions } from 'store/features/projectListSlice';

export const ProjectPopover = () => {
  const dispatch = useDispatch()
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
    <ButtonNoPadding type="link" onClick={() => dispatch(projectListActions.openProjectModal())}>创建项目</ButtonNoPadding>
  </Container>

  return <Popover placement="bottom" content={content}>
    <span>项目</span>
  </Popover>
}

const Container = styled.div`
  min-width: 30rem;
`
const ButtonNoPadding = styled(Button)`
  padding: 0;
`