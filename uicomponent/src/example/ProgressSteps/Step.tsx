import React from "react";
import "./step.scss";

export type StepType = { [key: string]: string | number };

interface IStepProps {
  width: string;
  stepItems: StepType[];
  currentActive: number;
  onClickItem: (val: StepType) => void;
}

export const Step: React.FC<IStepProps> = (props) => {
  const { width, stepItems, currentActive, onClickItem } = props;
  const handleSetOver = (num: number) => num >= 100 ? 100 : num;
  const computedWidth = (width: number) => handleSetOver(Number((width * currentActive + 1).toFixed(2))) + "%";
  const clickStep = (item: StepType) => onClickItem(item);

  return (
    <div className="step-container" style={{ width: width }}>
      <div className="progress" style={{ width: computedWidth(33.3333) }}></div>
      {
        stepItems?.map((item, index) => (
          <div key={item.id} className={`circle ${index <= currentActive ? 'active' : ''}`} onClick={() => clickStep(item)}>
            {item.text}
          </div>
        ))
      }
    </div>
  )
}