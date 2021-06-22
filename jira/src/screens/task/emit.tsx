export const ChildEmit = ({ title, changeTitle }: { title: string, changeTitle: Function }) => {
  const handleGeneric = <T extends {}>(props: T) => {
    console.log("泛型", props)
  }

  //  keyof：索引类型查询，返回后面跟着的类型参数的键值组成的字面量类型，就相当于 Object.keys()
  //1、 const handleGenericObj = <T extends object>(obj: T, key: keyof T) => {
  //2、 const handleGenericObj = <T extends object>(obj: T, key: keyof T): T[keyof T] => {
  const handleGenericObj = <T extends object, U extends keyof T>(obj: T, key: U): T[U] => {
    // T extends object：泛型T被限制为object类型
    // U extends keyof T： 泛型U必然是泛型T的键名组成的联合类型
    return obj[key]
  }

  // 返回一个数组
  const handleGenericArray = <T extends object, U extends keyof T>(obj: T, keys: U[]): T[U][] => {
    return keys?.map((key) => obj[key])
  }

  const handleChangeTitle = () => {
    changeTitle('hello react')

    handleGeneric("123")
    handleGeneric(123)

    let result = handleGenericObj({ a: 1, b: '2' }, 'b')
    console.log("result", result)
    let array = handleGenericArray({ a: 1, b: '2' }, ['a', 'b'])
    console.log("array", array)
  }
  return (
    <div onClick={handleChangeTitle}>{title}</div>
  )
}