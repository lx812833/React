import React from "react";

// interface IFormItemsProps {
//   [propName: string]: string;
// }

class Form extends React.Component {
  state = {
    formData: {}
  }

  // 提交
  handleSubmit(callback) {
    callback({ ...this.state.formData });
  }
  // 重置表单
  handleReset() {
    const { formData = {} } = this.state;
    // (Object.keys(formData) as Array<keyof IFormItemsProps>).forEach(item => {
    //   formData[item] = "";
    // })
    Object.keys(formData).forEach(item => {
      formData[item] = "";
    })
    this.setState({
      formData
    })
  }
  // 设置表单数据层
  handleSetValue = (name, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    })
  }

  render() {
    const { children } = this.props;
    const renderChildren = [];
    React.Children.forEach(children, (child) => {
      if (child.type.displayName === "formItem") {
        const { name } = child.props;
        // 克隆 FormItem 节点，混入改变表单单元项的方法
        const children_ = React.cloneElement(child, {
          key: name, // 加入key，提示渲染效果
          handleChange: this.handleSetValue, // 改变value
          value: this.state.formData[name] || "" // value值 
        }, child.props.children);

        renderChildren.push(children_);
      }
    })
    return renderChildren;
  }
}
Form.displayName = "form";

function FormItem(props) {
  const { children, name, handleChange, value, label } = props;
  const onChange = (value) => {
    console.log("change value", name, value);
    // 通知上一次value 已经改变
    handleChange(name, value);
  }

  return (
    <div className="form">
      <span className="label">{label}</span>
      {
        React.isValidElement(children) && children.type.displayName === "input"
          ? React.cloneElement(children, { onChange, value })
          : null
      }
    </div>
  )
}
FormItem.displayName = "formItem";

// Input 组件, 负责回传value值
function Input({ onChange, value }) {
  return (
    <input className="input" onChange={(e) => (onChange && onChange(e.target.value))} value={value} />
  )
}
Input.displayName = "input";

export const Index = () => {
  const form = React.useRef(null);

  // 表单提交
  const submit = () => {
    form.current.handleSubmit((formValue) => {
      console.log(formValue);
    })
  }
  // 表单重置
  const reset = () => {
    form.current.handleReset();
  }

  return <div className='box' >
    <Form ref={form} >
      <FormItem name="name" label="我是"  >
        <Input />
      </FormItem>
      <FormItem name="mes" label="我想对大家说"  >
        <Input />
      </FormItem>
    </Form>
    <div className="btns" >
      <button className="searchbtn" onClick={submit} >提交</button>
      <button className="concellbtn" onClick={reset} >重置</button>
    </div>
  </div>
}