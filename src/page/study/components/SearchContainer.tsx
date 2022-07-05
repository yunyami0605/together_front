import { FC, useState } from "react";
import "./SearchContainer.scss";

interface IProps {}
export default function SearchContainer() {
  return (
    <section>
      <section className="row search__container">
        <button className="select__box__btn">지역</button>
        <button className="select__box__btn">태그</button>

        <div className="row search__bar__box">
          <input type="text" placeholder="검색" className="search__bar" />
          <img className="input__btn" src={"/img/icon/img__search__icon.svg"} />
        </div>
      </section>

      {/* # 태그 */}
      <section className="row tag__list__box">
        <div className="tag__list">
          <button className="tag"># React</button>
          <button className="tag"># Java</button>
          <button className="tag"># Typescript</button>
        </div>

        <button className="tag__list__more__btn">▼</button>
      </section>
    </section>
  );
}
