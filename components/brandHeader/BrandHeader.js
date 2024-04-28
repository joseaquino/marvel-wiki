import Link from "next/link";
import React from "react";

import style from "./BrandHeader.module.scss";
import { MarvelLogo } from "./MarvelLogo";

const BrandHeader = () => (
  <div className={style.brandHeader}>
    <Link href="/" className={style.brandLogo}>
      <MarvelLogo />
    </Link>
    <div id={style.progressBar} />
  </div>
);

export default BrandHeader;
