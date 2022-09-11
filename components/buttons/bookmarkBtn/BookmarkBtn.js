import React, { useState, useEffect } from "react";

import BookmarkIcon from "../../icons/Bookmark";

import style from "./BookmarkBtn.module.scss";

const BookmarkBtn = ({ onBookmark, isBookmarked, label }) => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);

  useEffect(() => {
    if (isBookmarkedState !== isBookmarked) setIsBookmarkedState(isBookmarked);
  }, [isBookmarked]);

  const toggleBookmark = () =>
    setIsBookmarkedState(onBookmark() ? true : false);

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      className={
        isBookmarkedState
          ? `${style.bookmarked} ${style.bookmarkBtn}`
          : style.bookmarkBtn
      }
      aria-label={label}
    >
      <BookmarkIcon />
    </button>
  );
};

export default BookmarkBtn;
