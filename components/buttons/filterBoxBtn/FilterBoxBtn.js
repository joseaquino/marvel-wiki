import React, { useState } from "react";
import Router, { useRouter } from "next/router";

import FilterIcon from "../../icons/FilterIcon";
import ExpandableBtn from "../expandableBtn";

import { toQueryString } from "../../../services/marvelApi";

import style from "./FilterBoxBtn.module.scss";

const FilterBoxBtn = ({ tabs, isOpen, onBtnClick }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(() => {
    let tabActiveFromQuery = tabs.reduce((active, tab) => {
      if (router.query.filterBy === tab.queryKey) {
        return { ...tab, value: router.query.searchQuery };
      }

      return active;
    }, null);

    if (tabActiveFromQuery === null && tabs[0]) {
      return tabs[0];
    } else if (tabActiveFromQuery) {
      return tabActiveFromQuery;
    } else {
      return {};
    }
  });

  const handleFilterSubmit = (evt) => {
    evt.preventDefault();

    if (activeTab.value && activeTab.value.trim() !== "") {
      const query = {
        ...router.query,
        filterBy: activeTab.queryKey,
        searchQuery: activeTab.value,
      };
      const url = `${router.pathname}${toQueryString(query)}`;
      Router.push(url);
    }
  };

  const updateActivetab = (selectedTab) => {
    if (activeTab.queryKey !== selectedTab.queryKey) {
      tabs = tabs.map((tab) =>
        tab.queryKey === activeTab.queryKey ? activeTab : tab
      );
      setActiveTab(selectedTab);
    }
  };

  const updateTabValue = (evt) =>
    setActiveTab({ ...activeTab, value: evt.target.value });

  return (
    <div className={style.filterBoxContainer}>
      <ExpandableBtn
        hoverWidth="154px"
        text="Filter by:"
        icon={FilterIcon}
        action={onBtnClick}
        keepOpen={isOpen}
      />
      <div
        className={
          isOpen ? `${style.filterBox} ${style.filterBoxOpen}` : style.filterBox
        }
      >
        <div className={style.filterBoxTabs}>
          {tabs.map((tab) => (
            <button
              key={tab.queryKey}
              type="button"
              onClick={() => updateActivetab(tab)}
              className={activeTab.queryKey === tab.queryKey ? style.active : ""}
            >
              {tab.text}
            </button>
          ))}
        </div>
        <form onSubmit={handleFilterSubmit}>
          <input
            label={`Search by ${activeTab.text}`}
            type="text"
            value={activeTab.value ? activeTab.value : ""}
            onChange={updateTabValue}
          />
          <input type="submit" value="Filter" />
        </form>
      </div>
    </div>
  );
};

export default FilterBoxBtn;
