import React, { useState, useEffect } from 'react';
interface IHelloProps {
  message?: string;
}

export const Hello: React.FC<IHelloProps> = (props) => {
  const [like, setLike] = useState(0);
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPositions({ x: e.clientX, y: e.clientY });
    }
    document.addEventListener("click", updateMouse);

    return () => {
      document.removeEventListener("click", updateMouse);
    }
  })

  return (
    <>
      <h2>{props.message}</h2>
      <button onClick={() => setLike(like + 1)}>
        {like}赞
      </button>
      <h4>X: {positions.x}, Y: {positions.y}</h4>
    </>
  )
}

Hello.defaultProps = {
  message: "hh"
}