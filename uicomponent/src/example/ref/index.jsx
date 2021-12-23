import React from "react";

class Children extends React.Component {
  render = () => <div>hello world</div>
}

// Ref属性是一个字符串
export class StringRef extends React.Component {
  componentDidMount() {
    console.log("挂载完成", this.refs);
  }

  render = () => (
    <div style={{ marginTop: "50px" }}>
      <div ref="currentDom">字符串模式获取元素或组件</div>
      <Children ref="currentComInstance" />
    </div>
  )
}

// Ref属性是一个函数 
export class FunctionRef extends React.Component {
  currentDom = React.createRef(null);
  currentComponentInstance = null;

  componentDidMount() {
    console.log("currentDom", this.currentDom);
    console.log("currentComponentInstance", this.currentComponentInstance);
  }

  render = () => (
    <div style={{ marginTop: "50px" }}>
      <div ref={(node) => this.currentDom = node}  >Ref模式获取元素或组件</div>
      <Children ref={(node) => this.currentComponentInstance = node} />
    </div>
  )
}

// Ref属性是一个ref对象
export class ObjectRef extends React.Component {
  currentDom = React.createRef(null);
  currentComponentInstance = React.createRef(null);
  componentDidMount() {
    console.log(this.currentDom);
    console.log(this.currentComponentInstance);
  }
  render = () => <div style={{ marginTop: "50px" }}>
    <div ref={this.currentDom}  >Ref对象模式获取元素或组件</div>
    <Children ref={this.currentComponentInstance} />
  </div>
}