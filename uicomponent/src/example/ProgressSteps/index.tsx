import React from "react";
import "./index.scss";

export const ProgressSteps: React.FC = (props) => {
  return (
    <div className="progress-steps-container">
      <button>普通</button>
      <button>active</button>
    </div>
  )
}