import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Button, List, Avatar, Space, Input } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { selectMovieState, getMovieList } from 'store/features/movieSlice';
import { FullPageLoading } from 'components/fullPage';

interface ChildEmitProps {
  title: string;
  changeTitle: Function;
  info: string;
  changeInfo: Function;
  testCallBack: Function;
}

export const ChildEmit = ({ title, changeTitle, testCallBack, info, changeInfo }: ChildEmitProps) => {
  // useCallBack：返回一个函数
  const childCount = testCallBack()
  // v-model
  const [value, setValue] = useState("请输入内容")

  // react-redux
  const dispatch = useDispatch()
  const { loading, data: movieList } = useSelector(selectMovieState)

  useEffect(() => {
    dispatch(getMovieList())
    // eslint-disable-next-line
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
  if (loading) {
    return <FullPageLoading />
  }

  const IconText = ({ icon, text }: { icon: any, text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // 表单元素的v-model
  const handleSetModel = (e: any) => {
    setValue(e?.target?.value)
  }

  return (
    // 根元素：React.Fragment，相当于 <></>
    <>
      <div onClick={handleChangeTitle}>{title}</div>
      <Input type="text" onChange={handleSetModel} />
      <p>表单元素v-model：{value}</p>
      <Button onClick={() => changeInfo('子组件改变info的值')}>组件v-model：{info}</Button>

      <div>子组件的count：{childCount}</div>
      <List itemLayout="vertical" size="large" dataSource={movieList}
        pagination={{
          onChange: page => {
            console.log('pagination', page);
          },
          pageSize: 3,
        }}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.tvId}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={<img width={272} alt="logo" src={item?.imageUrl} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item?.imageUrl} />}
              title={<a href={item.playUrl}>{item.title}</a>}
              description={item.description}
            />
            {item.focus}
          </List.Item>
        )}
      />
    </>
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