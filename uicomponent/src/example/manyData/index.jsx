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

// 不做处理，一次性渲染数据 
// class Numerous extends React.Component {
//   state = {
//     dataList: [], // 数据列表
//     renderList: [], // 渲染列表
//     position: {
//       width: 0, // 位置信息
//       height: 0
//     }
//   }
//   box = React.createRef();

//   componentDidMount() {
//     if (this.box.current) {
//       const { offsetHeight, offsetWidth } = this.box.current;

//       const originList = new Array(20000).fill(1);
//       this.setState({
//         position: { height: offsetHeight, width: offsetWidth },
//         dataList: originList,
//         renderList: originList,
//       })
//     }
//   }

//   render() {
//     const { renderList, position } = this.state;

//     return (
//       <div className={styles["bigData_index"]} ref={this.box}>
//         {
//           renderList.map((item, index) => <SetCircle position={position} key={index} />)
//         }
//       </div>
//     )
//   }
// }


// 优化处理，分片渲染
class Numerous extends React.Component {
  state = {
    dataList: [], // 数据列表
    renderList: [], // 渲染列表
    position: {
      width: 0, // 位置信息
      height: 0
    },
    eachRenderNum: 500 // 每次渲染量
  }
  box = React.createRef();

  componentDidMount() {
    if (this.box.current) {
      const { offsetHeight, offsetWidth } = this.box.current;
      const originList = new Array(20000).fill(1);
      const times = Math.ceil(originList.length / this.state.eachRenderNum); // 渲染次数
      let index = 1;

      // 第二个参数是一个回调函数，在setState的异步操作结束并且组件已经重新渲染的时候执行
      // 也就是说，可以通过这个回调来拿到更新的state的值

      this.setState({
        position: { height: offsetHeight, width: offsetWidth },
        dataList: originList,
      }, () => {
        this.handleToRender(index, times);
      })
    }
  }

  handleToRender = (index, times) => {
    if (index > times) {
      // 渲染完成
      return;
    }
    const { renderList } = this.state;
    // 通过缓存element把所有渲染完成的list缓存下来，下一次更新，直接跳过渲染
    let temp = this.renderNewList(index);
    renderList.push(temp);
    this.setState({
      renderList,
    })

    /**
     * window.requestIdleCallback():
     * 插入一个函数，这个函数将在浏览器空闲时期被调用。
     * 这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。
     * 函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。
     */

    requestIdleCallback(() => {
      this.handleToRender(++index, times)
    })
  }

  // 得到最新的渲染列表
  renderNewList(index) {
    const { dataList, position, eachRenderNum } = this.state;
    const list = dataList.slice((index - 1) * eachRenderNum, index * eachRenderNum);
    return <React.Fragment key={index} >
      {
        list.map((item, index) => <SetCircle key={index} position={position} />)
      }
    </React.Fragment>
  }

  render() {
    return <div className={styles["bigData_index"]} ref={this.box}>
      {this.state.renderList}
    </div>
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