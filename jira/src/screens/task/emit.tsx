
export const ChildEmit = ({ title, changeTitle }: { title: string, changeTitle: Function }) => {
  const handleChangeTitle = () => {
    changeTitle('hello react')
  }
  return (
    <div onClick={handleChangeTitle}>{title}</div>
  )
}