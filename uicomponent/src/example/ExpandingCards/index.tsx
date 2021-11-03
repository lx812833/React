import React, { useState, useEffect } from "react";
import "./index.scss";

export const ExpandingCards: React.FC = (props) => {
  const [currentActive, setCurrentActive] = useState(0);
  const DOCUMENT_TITLE = "Expanding Cards";
  const imageItems = [
    "https://img2.baidu.com/it/u=1947582535,1861087167&fm=26&fmt=auto",
    "https://img2.baidu.com/it/u=3180545121,11886746&fm=26&fmt=auto",
    "https://img1.baidu.com/it/u=1652898328,3437528349&fm=26&fmt=auto",
    "https://img0.baidu.com/it/u=3571261003,3306897029&fm=26&fmt=auto",
    "https://img1.baidu.com/it/u=3270655349,613028522&fm=26&fmt=auto",
  ];

  useEffect(() => {
    if (document.title !== DOCUMENT_TITLE) {
      document.title = DOCUMENT_TITLE;
    }
  })

  const onChangeHandler = (index: number) => setCurrentActive(index);

  return (
    <div className="expand-cards-container">
      {
        imageItems?.map((item, index) =>
          <div
            className={`panel ${currentActive === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${item})` }}
            onClick={onChangeHandler.bind(this, index)}
            key={item + index}
          >
          </div>
        )
      }
    </div>
  )
}