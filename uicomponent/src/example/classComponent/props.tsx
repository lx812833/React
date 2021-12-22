import React from "react";

interface IProps {
  msg: string;
  say: () => void;
  children: React.ReactNode;
  Component: any;
  renderName: any;
}

// 子组件
function ChidrenComponent() {
  return (
    <div>这是子组件</div>
  )
}

// props接收处理
class PropsComponent extends React.Component<IProps> {
  componentDidMount() {
    console.log("Mount触发", this);
  }
  render() {
    const { children, msg, say, Component, renderName } = this.props;

    return (
      <div>
        {msg}
        {children}
        {renderName()}
        <Component />
        <button onClick={() => say()}>change State</button>
      </div>
    )
  }
}

// props 定义绑定
export default class Props extends React.Component {
  state = {
    msg: "hello react"
  }
  node = null;
  say = () => this.setState({ msg: "let us learn React!" });

  render() {
    return (
      <div>
        <PropsComponent
          msg={this.state.msg} // // props 作为一个渲染数据源
          say={this.say} // props 作为一个回调函数callBack
          Component={ChidrenComponent} //  props 作为一个组件
          renderName={() => <div> my name is alien </div>} // ④ props 作为渲染函数
        >
          <div> hello world </div>
          <ChidrenComponent />
        </PropsComponent>
      </div>
    )
  }
}