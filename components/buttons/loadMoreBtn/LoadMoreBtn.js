import React, { useState } from "react";

import style from "./LoadMoreBtn.module.scss";

const LoadMoreBtn = ({ loaderFunc }) => {
  const [loading, setLoadingState] = useState(false);

  const loadMoreItems = () => {
    setLoadingState(true);
    return loaderFunc().then(() => setLoadingState(false));
  };

  return (
    <div className={style.loadMoreBtnContainer}>
      <button
        className={
          loading ? `${style.loadMoreBtn} ${style.loading}` : style.loadMoreBtn
        }
        type="button"
        onClick={loadMoreItems}
      >
        {loading ? (
          <div className={style.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          "CLick to Load More..."
        )}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
