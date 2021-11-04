import React, { useState } from "react";
import { Step, StepType } from "./Step";
import "./index.scss";

export const ProgressSteps: React.FC = (props) => {
  const stepItems = [
    { text: "1", id: "1" },
    { text: "2", id: "2" },
    { text: "3", id: "3" },
    { text: "4", id: "4" },
  ];
  const secondStepItems = [
    { text: "活动未开始", id: "1" },
    { text: "活动已开始", id: "2" },
    { text: "活动快完成", id: "3" },
    { text: "活动已结束", id: "4" },
  ];
  const [currentActive, setCurrentActive] = useState(0);

  const selectStep = (val: StepType) => {
    const { text } = val;
    console.log("%c " + text, "background:#0ca6dc;padding:4px 10px;border-radius:3px;color:#fff");
  }
  const prevHandler = () => {
    if(currentActive > 0) {
      setCurrentActive(currentActive - 1);
    }
  }
  const nextHandler = () => {
    if(currentActive < stepItems.length - 1) {
      setCurrentActive(currentActive + 1);
    }
  }

  return (
    <div className="progress-steps-container">
      <Step width="350px" stepItems={stepItems} currentActive={currentActive} onClickItem={selectStep}></Step>
      <Step width="350px" stepItems={secondStepItems} currentActive={currentActive} onClickItem={selectStep}></Step>
      <div>
        <button type="button" className="prev" onClick={prevHandler} disabled={currentActive === 0}>上一步</button>
        <button type="button" className="next" onClick={nextHandler} disabled={currentActive === stepItems.length - 1}>下一步</button>
      </div>
    </div>
  )
}