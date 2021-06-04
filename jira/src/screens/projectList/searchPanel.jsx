export default SearchPanel = ({ users, param, setParam }) => {
  return <form>
    <div>
      {/* useState 不会自动合并更新对象。可以用函数式的 setState 结合扩展运算符来达到合并更新对象的效果。 */}
      <input type="text" value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value
      })} />
      <select value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.value
      })}>
        <option value={''}>负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}