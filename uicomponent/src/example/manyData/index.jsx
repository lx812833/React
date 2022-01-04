import React, { useMemo, useState } from "react";
import styles from "./index.module.scss";

// 随机颜色
const getColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
}

// 随机位置
const getPostion = (position) => {
  const { width, height } = position;

  return {
    left: Math.ceil(Math.random() * width) + "px",
    top: Math.ceil(Math.random() * height) + "px"
  };
}

// React 组件名称必须以大写字母开头
const SetCircle = ({ position }) => {
  // 用useMemo缓存，计算出来的随机位置和色值。
  const style = useMemo(() => {
    return {
      background: getColor(),
      ...getPostion(position)
    }
  }, [])

  return <div style={style} className={styles["circle"]} />
}

class Numerous extends React.Component {
  state = {
    dataList: [], // 数据列表
    renderList: [], // 渲染列表
    position: {
      width: 0, // 位置信息
      height: 0
    }
  }
  box = React.createRef();

  componentDidMount() {
    if (this.box.current) {
      const { offsetHeight, offsetWidth } = this.box.current;

      const originList = new Array(20000).fill(1);
      this.setState({
        position: { height: offsetHeight, width: offsetWidth },
        dataList: originList,
        renderList: originList,
      })
    }
  }

  render() {
    const { renderList, position } = this.state;

    return (
      <div className={styles["bigData_index"]} ref={this.box}>
        {
          renderList.map((item, index) => <SetCircle position={position} key={index} />)
        }
      </div>
    )
  }
}

// 控制展示
export const NumerousData = () => {
  const [show, setShow] = useState(false);
  const [btnShow, setBtnShow] = useState(true);
  const handleClick = () => {
    setBtnShow(false)
    setTimeout(() => { setShow(true) }, []);
  }
  return <div>
    {btnShow && <button onClick={handleClick} >show</button>}
    {show && <Numerous />}
  </div>
}