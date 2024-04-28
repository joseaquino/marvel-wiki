import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  isComicBookmarked,
  toggleComicBookmark,
} from "../../services/bookmarks";
import BookmarkBtn from "../buttons/bookmarkBtn";
import style from "./ComicCard.module.scss";

const ComicCard = ({
  id,
  title,
  thumbnail,
  issueNumber,
  description,
  stories,
}) => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  const bookmarkItem = () => {
    toggleComicBookmark({
      id,
      title,
      thumbnail,
      issueNumber,
      description,
      stories,
    });
    return isComicBookmarked(id);
  };

  // The bookmarking of the card must be done after render as this component
  // will be rendered server side where there is no local storage, and it only
  // needs to be done on the first render
  useEffect(() => {
    setIsBookmarkedState(isComicBookmarked(id));
  }, []);

  return (
    <div className={style.comicCard}>
      <Link href="/comic/[comicID]" as={`/comic/${id}`} prefetch={false}>
        <div className={style.comicPortraitFrame}>
          <div
            className={style.comicPortrait}
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
        </div>
        <div className={style.comicDetails}>
          <span>Issue Number {issueNumber}</span>
          <p>{title}</p>
        </div>
      </Link>
      <span className={style.bookmarker}>
        <BookmarkBtn
          label={`Add comic ${title} to bookmarks`}
          onBookmark={bookmarkItem}
          isBookmarked={isBookmarkedState}
        />
      </span>
    </div>
  );
};

export default ComicCard;
