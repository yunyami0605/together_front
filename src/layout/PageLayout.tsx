import Header from "common/header/Header";
import SideHeader from "common/header/SideHeader";
import { FC, ReactElement, ReactNode, useState } from "react";
import "./PageLayout.scss";

export default function PageLayout(
  Component: React.ComponentType,
  option?: any
) {
  return (
    <section className="row page__layout">
      <section className="page__layout__left">
        <SideHeader />
      </section>

      <section className="page__layout__right">
        <Header />
        <Component />
      </section>
    </section>
  );
}
