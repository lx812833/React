import { Drawer, Button } from 'antd';

interface ProjectModalProps {
  projectModalOpen: boolean,
  onClose: () => void
}

export const ProjectModal = (props: ProjectModalProps) => {
  return <Drawer onClose={props.onClose} visible={props.projectModalOpen} width="100%">
    project modal
    <Button onClick={props.onClose}>关闭</Button>
  </Drawer>
}