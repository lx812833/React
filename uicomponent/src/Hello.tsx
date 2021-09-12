import React, { useState } from 'react';
import { useMousePosition } from '../src/hooks/useMousePosition';
import { useUrlLoader } from '../src/hooks/useUrlLoader';
interface IHelloProps {
  message?: string;
}

interface IShowPicture {
  message: string;
  status: string;
}

export const Hello: React.FC<IHelloProps> = (props) => {
  const [like, setLike] = useState(0);
  const position = useMousePosition();
  const [data, loading] = useUrlLoader("https://dog.ceo/api/breeds/image/random", [like]);
  const dogResult = data as IShowPicture;

  return (
    <>
      <h2>{props.message}</h2>

      <button onClick={() => setLike(like + 1)}>
        {like}赞
      </button>
      <h4>X: {position.x}, Y: {position.y}</h4>

      {loading ? <p>加载中</p> : <img src={dogResult && dogResult.message} width="100px" />}
    </>
  )
}

Hello.defaultProps = {
  message: "hh"
}