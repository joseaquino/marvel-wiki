import React from "react";
import Router, { useRouter } from "next/router";

import SortAlphaDownIcon from "../../icons/SortAlphaDown";
import SortAlphaUpIcon from "../../icons/SortAlphaUp";
import ExpandableBtn from "../expandableBtn";

import { toQueryString } from "../../../services/marvelApi";

const SortingBtn = () => {
  const router = useRouter();
  const sorting = router.query.sort ? router.query.sort : "down";

  const changeSorting = () => {
    let query = {
      ...router.query,
      sort: sorting === "down" ? "up" : "down",
    };

    let url = `${router.pathname}${toQueryString(query)}`;
    Router.push(url);
  };

  return (
    <ExpandableBtn
      hoverWidth="154px"
      text={sorting === "down" ? "Sort A-Z" : "Sort Z-A"}
      icon={sorting === "down" ? SortAlphaDownIcon : SortAlphaUpIcon}
      action={changeSorting}
    />
  );
};

export default SortingBtn;
