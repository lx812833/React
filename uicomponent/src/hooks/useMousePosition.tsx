import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    document.addEventListener("mousemove", updateMouse);
    
    return () => {
      document.removeEventListener("mousemove", updateMouse);
    }
  }, [])
  return position;
}