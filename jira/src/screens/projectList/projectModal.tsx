import { Drawer, Button } from 'antd';
import { useProjectModal } from 'components/project';

export const ProjectModal = () => {
  const { projectModalOpen, closeProjectModal } = useProjectModal()

  return (
    <Drawer
      onClose={closeProjectModal}
      visible={projectModalOpen}
      width="100%"
    >
      project modal
      <Button onClick={closeProjectModal}>关闭</Button>
    </Drawer>
  )
}