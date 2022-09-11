import { useState } from "react";

import FilterBoxBtn from "../buttons/filterBoxBtn";
import SortingBtn from "../buttons/sortingBtn";
import style from "./Filter.module.scss"

const CharactersFilters = ({ tabs }) => {
  const [filterBoxOpen, setFilterBoxStatus] = useState(false);

  return (
    <div className={style.filterContainer}>
      <FilterBoxBtn
        tabs={tabs}
        isOpen={filterBoxOpen}
        onBtnClick={() => setFilterBoxStatus(!filterBoxOpen)}
      />
      <SortingBtn />
    </div>
  );
};

export default CharactersFilters;
