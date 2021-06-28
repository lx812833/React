import { useEffect } from 'react';
import { Drawer, Button, Spin, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ErrorTypography } from 'components/fullPage';
import { useProjectModal, useEditProject, useAddProject } from 'components/project';
import { UserSelect } from 'components/user';
import styled from '@emotion/styled';

export const ProjectModal = () => {
  const { projectModalOpen, closeProjectModal, editngProject, isLoading } = useProjectModal()
  const useMutateProject = editngProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()

  const title = editngProject ? '编辑项目' : '创建项目'

  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editngProject, ...values }).then(res => {
      // 重置表单
      form.resetFields()
      closeProjectModal()
    })
  }

  useEffect(() => {
    if(editngProject) {
      form.setFieldsValue(editngProject)
    } else {
      form.resetFields()
    }
  }, [editngProject, form])

  return (
    // forceRender 无论是否渲染完成，强制刷新
    <Drawer forceRender={true} onClose={closeProjectModal} visible={projectModalOpen} width="100%">
      <Container>
        {
          isLoading ? <Spin size="large" /> : <>
            <h1>{title}</h1>
            <ErrorTypography error={error} />
            <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
              <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
                <Input placeholder="请输入项目名称" />
              </Form.Item>

              <Form.Item label="部门" name="organization" rules={[{ required: true, message: '请输入部门名称' }]}>
                <Input placeholder="请输入部门名称" />
              </Form.Item>

              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button loading={mutateLoading} type="primary" htmlType="submit">提交</Button>
              </Form.Item>
            </Form>
          </>
        }
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`