import NProgress from "nprogress";
import Router from "next/router";

import "../assets/styles/app.scss";
import headerStyle from "../components/brandHeader/BrandHeader.module.scss"

import BrandHeader from "../components/brandHeader";
import MainNav from "../components/mainNav";

NProgress.configure({ parent: `#${headerStyle.progressBar}`, minimum: 0.25 });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <BrandHeader />
      <MainNav />
      <Component {...pageProps} />
    </>
  );
}
