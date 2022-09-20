import { useState } from "react";
// 引入相关hooks
import { useSelector, useDispatch } from "react-redux";
// 引入对应的方法
import { increment, decrement } from "./store/features/counterSlice";
import { getMovieData } from "./store/features/movieSlice";
import logo from './logo.svg';
import './App.css';

function App() {
  // 通过useSelector直接拿到store定义的value值
  const { value } = useSelector((store) => store.counter);
  const { list } = useSelector((store) => store.movie);
  // 通过dispatch触发事件
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{value}</p>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={() => { dispatch(increment({ value: amount })) }}>加</button>
        <button onClick={() => { dispatch(decrement()) }}>减</button>
        <button onClick={() => { dispatch(getMovieData()) }}>获取数据</button>
        <ul>
          {
            list.map(item => {
              return <li key={item.tvId}> {item.name}</li>
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
