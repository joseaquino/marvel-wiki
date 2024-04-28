import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import Filter from "../Filter/Filter";

import style from "./MainNav.module.scss";

const charactersFilterTabs = [
  { queryKey: "name", text: "Name" },
  { queryKey: "comic", text: "Comic" },
  { queryKey: "story", text: "Story" },
];

const comicsFilterTabs = [
  { queryKey: "format", text: "Format" },
  { queryKey: "title", text: "Title" },
  { queryKey: "issueNumber", text: "Issue #" },
];

const MainNav = () => {
  const router = useRouter();
  const { pathname } = router;

  const isNavVisible = () =>
    pathname === "/" || pathname === "/comics" || pathname === "/bookmarks";

  const hasFilters = () => filters[pathname] !== undefined;

  const filters = {
    "/": <Filter tabs={charactersFilterTabs} />,
    "/comics": <Filter tabs={comicsFilterTabs} />,
  };

  return isNavVisible() ? (
    <div className={style.navContainer}>
      <nav>
        <Link
          href="/"
          as="/"
          prefetch={false}
          className={pathname === "/" ? style.active : ""}
          id={style.charactersNav}
        >
          Characters
        </Link>
        <Link
          href="/comics"
          as="/comics"
          prefetch={false}
          className={pathname === "/comics" ? style.active : ""}
          id={style.comicsNav}
        >
          Comics
        </Link>
        <Link
          href="/bookmarks"
          as="/bookmarks"
          prefetch={false}
          className={pathname === "/bookmarks" ? style.active : ""}
          id={style.bookmarksNav}
        >
          Bookmarks
        </Link>
        <span className={style.activeIndicator} />
      </nav>
      {hasFilters() ? (
        <div className={style.pageFilters}>{filters[pathname]}</div>
      ) : null}
    </div>
  ) : null;
};

export default MainNav;
