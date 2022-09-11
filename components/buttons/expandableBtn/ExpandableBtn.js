import React, { useState } from "react";

import style from "./ExpandableBtn.module.scss";

const ExpandableBtn = ({ hoverWidth, text, icon, action, keepOpen }) => {
  const Icon = icon;
  const defaultWidth = "48px";
  const [width, setWidth] = useState(defaultWidth);

  const expandButton = () => setWidth(hoverWidth);

  const contractButton = () => (keepOpen ? null : setWidth(defaultWidth));

  const callAction = () => (typeof action === "function" ? action() : null);

  return (
    <button
      className={
        keepOpen
          ? `${style.keepOpen} ${style.expandableBtn}`
          : style.expandableBtn
      }
      type="button"
      onClick={callAction}
      onMouseEnter={expandButton}
      onFocus={expandButton}
      onBlur={contractButton}
      onMouseLeave={contractButton}
      style={{ width }}
      aria-label="text"
    >
      <div className={style.btnIcon}>
        <Icon />
      </div>
      <span>{text}</span>
    </button>
  );
};

export default ExpandableBtn;
