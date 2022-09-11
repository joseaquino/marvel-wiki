import React from "react";
import Link from "next/link";

import style from "./BrandHeader.module.scss";
import { MarvelLogo } from "./MarvelLogo";

const BrandHeader = () => (
  <div className={style.brandHeader}>
    <Link href="/">
      <a className={style.brandLogo}>
	  	<MarvelLogo />
      </a>
    </Link>
    <div id={style.progressBar} />
  </div>
);

export default BrandHeader;
