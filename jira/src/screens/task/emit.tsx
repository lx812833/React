import { useEffect, useState } from 'react';
// useSelector
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { activitySlice } from 'store/features/activitySlice';
import store from 'store/index';

const moviesUrl = 'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48'
const loadMoviesAPI = () => fetch(moviesUrl).then(res => res.json())

export const ChildEmit = ({ title, changeTitle }: { title: string, changeTitle: Function }) => {
  // react-redux
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchDate = async () => {
      dispatch(activitySlice.actions.fetchStart())
      console.log("获取的", store)
      try {
        const { data } = await loadMoviesAPI()
        const { list } = data
        dispatch(activitySlice.actions.fetchSuccess({
          data: list,
          total: list.length,
          pageNumber: 1,
          pageSize: 10
        }))
        console.log("获取的res列表", data)
      } catch (error) {
        dispatch(activitySlice.actions.fetchFail(error))
      }
    }
    fetchDate()
  }, [])


  const handleGeneric = <T extends {}>(props: T) => {
    console.log("props", props)
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


// 进度条
export const ProgressBar = () => {
  let totalTime = 3000  // 设置视频播放为30s
  const [isplay, setIsplay] = useState(true) // 是否播放
  const [type, setType] = useState(0) // 使用哪个动画 0: @keyframes play; 1: @keyframes replay;

  // 暂停 & 播放
  const handlePlayer = () => setIsplay(!isplay)
  // 重播
  const handleReplay = () => {
    setIsplay(true)
    setType(type ? 0 : 1)
  }
  // 动画结束事件
  const handleEnd = () => handleReplay()

  return (
    <Player>
      <Button onClick={handlePlayer}>{isplay ? '暂停' : '播放'}</Button>
      <Button onClick={handleReplay}>重播</Button>
      <div className="container">
        <div
          className={`progress ${isplay ? 'play' : 'pause'}`}
          style={{
            animationDuration: `${totalTime}ms`,
            animationName: `${type ? 'replay' : 'play'}`,
            // 使animation动画或暂停
            animationPlayState: `${isplay ? 'running' : 'paused'}`
          }}
          onAnimationEnd={handleEnd} // 动画结束时事件
        ></div>
      </div>
    </Player>
  )
}

const Player = styled.div`
  padding: 10rem;
  Button {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  .container {
    height: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    .progress  {
      height: 100%;
      width: 100%;
      will-change: transform; /* 通过will-change告知浏览器提前做好优化准备 */
      animation-timing-function: linear;
      background-color: #ccc;

      @keyframes play {
        0% {  
          transform: translateX(-50%) scaleX(0);  /* 用 scaleX 来代替 width */
        }
        to {
          transform: translateX(0) scaleX(1);
        }
      }

      @keyframes replay {
        0% {
          transform: translateX(-50%) scaleX(0);
        }
        to {
          transform: translateX(0) scaleX(1);
        }
      }
    }
  }
`