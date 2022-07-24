import Selector from "common/selector/Selector";
import {
  SELECTOR_MEAT_LIST,
  SELECTOR_REGION_LIST,
  SELECTOR_SUB_REGION_LIST,
  SELECTOR_RECRUIT_TYPE,
  SELECTOR_RECRUIT_SUB_TYPE,
} from "common/constant";
import { FC, useEffect, useMemo, useState } from "react";
import "./SearchContainer.scss";
import { useGetStudyBoardListQuery } from "redux/service/study/board";

interface IProps {}
export default function SearchContainer() {
  const meatList = useMemo(() => SELECTOR_MEAT_LIST, []);

  const regionList = useMemo(() => SELECTOR_REGION_LIST, []);
  const subRegionList = useMemo(() => SELECTOR_SUB_REGION_LIST, []);

  const togetherTypeList1 = useMemo(() => SELECTOR_RECRUIT_TYPE, []);
  const togetherTypeList2 = useMemo(() => SELECTOR_RECRUIT_SUB_TYPE, []);

  const [location, setLocation] = useState([0, 0, 0]);
  const [contentType, setContentType] = useState([0, 0]);
  const [page, setPage] = useState(1);

  const test = useGetStudyBoardListQuery({
    page,
    location1: location[0],
    location2: location[1],
    location3: location[2],
    contentType1: contentType[0],
    contentType2: contentType[1],
  });

  const onSearch = () => {};

  useEffect(() => {
    onSearch();
  }, [location, contentType]);

  return (
    <section>
      <section className="row search__filter">
        <button onClick={() => setPage(page + 1)}>test</button>
        <Selector
          data={meatList}
          setItem={(item: number) =>
            setLocation((prev) => [item, prev[1], prev[2]])
          }
          selectedItem={location[0]}
          className="search__first__selector"
        />

        <Selector
          data={regionList}
          setItem={(item: number) =>
            setLocation((prev) => [prev[0], item, prev[2]])
          }
          selectedItem={location[1]}
        />

        <Selector
          data={subRegionList[location[1]]}
          setItem={(item: number) =>
            setLocation((prev) => [item, prev[1], prev[2]])
          }
          selectedItem={location[2]}
        />

        <Selector
          data={togetherTypeList1}
          setItem={(item: number) => setContentType((prev) => [item, prev[1]])}
          selectedItem={contentType[0]}
        />
        <Selector
          data={togetherTypeList2[contentType[0]]}
          setItem={(item: number) => setContentType((prev) => [prev[0], item])}
          selectedItem={contentType[1]}
        />
      </section>

      <section className="search__container">
        <div className="row search__bar__box">
          <input type="text" placeholder="검색" className="search__bar" />
          <button className="input__btn">
            <img src={"/img/icon/img__search__icon.svg"} />
          </button>
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
