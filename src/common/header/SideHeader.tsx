import React, { FC, useState } from "react";
import SideBtn from "./components/SideBtn";
import "./SideHeader.scss";

const sideMenuInfoList = [
  {
    src: "study",
    name: "스터디",
  },
  {
    src: "sideproject",
    name: `사이드\n프로젝트`,
  },
  {
    src: "club",
    name: "동아리",
  },
  {
    src: "mento",
    name: "멘토링",
  },
  {
    src: "story",
    name: "스토리",
  },
];

export default function SideHeader() {
  return (
    <section className="column page__side__header">
      <button>
        <div>
          <img src={`/img/icon/img__menu__icon.svg`} alt="ic" />
        </div>
      </button>

      {sideMenuInfoList.map((val, i) => (
        <React.Fragment key={i}>
          <SideBtn src={val.src} txt={val.name} />
        </React.Fragment>
      ))}

      {/* <button>내정보</button> */}
    </section>
  );
}
