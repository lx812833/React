import React from "react";
import { render } from "@testing-library/react";
import { Button } from "./button";

test("test case", () => {
  const wrapper = render(<Button>Test</Button>);
  const element = wrapper.queryByText("Test");
  expect(element).toBeTruthy();
})