import React, { useState, useRef, useEffect, useContext } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useUrlLoader } from '../hooks/useUrlLoader';
import { themeContext } from "./App";
interface IHelloProps {
  message?: string;
}

interface IShowPicture {
  message: string;
  status: string;
}

export const Hello: React.FC<IHelloProps> = (props) => {
  const [like, setLike] = useState(0);
  const times = useRef(0);
  const domRef = useRef<HTMLInputElement>(null);
  const position = useMousePosition();
  const [data, loading] = useUrlLoader("https://dog.ceo/api/breeds/image/random", [like]);
  const dogResult = data as IShowPicture;
  const theme = useContext(themeContext);

  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus(); // domRef.current DOM节点
    }
  })

  return (
    <>
      <input type="text" ref={domRef} />

      <h2>{props.message}</h2>

      <button style={theme} onClick={() => { setLike(like + 1); times.current++ }}>
        {like}赞  {times.current}
      </button>
      <h4>X: {position.x}, Y: {position.y}</h4>

      {loading ? <p>加载中</p> : <img src={dogResult && dogResult.message} alt="dog" width="100px" />}
    </>
  )
}

Hello.defaultProps = {
  message: "hh"
}