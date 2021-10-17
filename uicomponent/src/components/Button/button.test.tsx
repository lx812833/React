import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button, ButtonProps, ButtonSize, ButtonType } from "./button";

// yarn test

test("test case", () => {
  const wrapper = render(<Button>Test</Button>);
  const element = wrapper.queryByText("Test");
  expect(element).toBeTruthy();
})

const defaultProps = {
  // 创建一被监控的模拟函数
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "test"
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe("test Button component", () => {
  // 测试default button
  it("render default button", () => {
    const wrapper = render(<Button {...defaultProps}>Test</Button>);
    const element = wrapper.getByText("Test") as HTMLButtonElement;
    expect(element).toBeInTheDocument(); // 是否存在于文档流中
    expect(element.tagName).toEqual("BUTTON"); // 是否是button标签
    expect(element.disabled).toBeFalsy(); // 是否为false
    expect(element).toHaveClass("btn btn-default"); // 是否存在某class

    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled(); // 模拟事件调用
  })
  // 测试different props button
  it("render different props", () => {
    const wrapper = render(<Button {...testProps}>Test</Button>);
    const element = wrapper.getByText("Test");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg test");
  })
  // 测试a link button，并且 提供 href属性
  it("render a link and href is provider", () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://test">a link</Button>)
    const element = wrapper.getByText("a link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A"); // 是否是button标签
    expect(element).toHaveClass("btn btn-link");
  })

  // 测试disabled button
  it("render disabled button", () => {
    const wrapper = render(<Button {...disabledProps}>Test</Button>)
    const element = wrapper.getByText("Test") as HTMLButtonElement; // 类型断言为HTMLButtonElement属性
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();

    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled(); // 事件没被调用
  })
})