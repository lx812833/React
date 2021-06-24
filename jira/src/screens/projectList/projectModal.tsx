import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { projectListActions } from 'store/features/projectListSlice';
import { selectProjectState } from 'store/features/projectListSlice';

export const ProjectModal = () => {
  const dispatch = useDispatch()
  // useSelector：读取store根状态树里的状态值
  const { projectModalOpen } = useSelector(selectProjectState)

  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      visible={projectModalOpen}
      width="100%"
    >
      project modal
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
  )
}