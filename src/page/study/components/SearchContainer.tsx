import Selector from "common/selector/Selector";
import {
  SELECTOR_MEAT_LIST,
  SELECTOR_REGION_LIST,
  SELECTOR_SUB_REGION_LIST,
  SELECTOR_RECRUIT_TYPE,
  SELECTOR_RECRUIT_SUB_TYPE,
} from "common/constant";
import { useMemo } from "react";
import "./SearchContainer.scss";
import { typeSetState } from "types/common";

interface IProps {
  location: number[];
  setLocation: typeSetState<number[]>;
  contentType: number[];
  setContentType: typeSetState<number[]>;
  page: number;
  setPage: typeSetState<number>;
  searchTxt: string;
  setSearchTxt: typeSetState<string>;
}
export default function SearchContainer({
  location,
  setLocation,
  contentType,
  setContentType,
  page,
  setPage,
  searchTxt,
  setSearchTxt,
}: IProps) {
  const meatList = useMemo(() => SELECTOR_MEAT_LIST, []);

  const regionList = useMemo(() => SELECTOR_REGION_LIST, []);
  const subRegionList = useMemo(() => SELECTOR_SUB_REGION_LIST, []);

  const togetherTypeList1 = useMemo(() => SELECTOR_RECRUIT_TYPE, []);
  const togetherTypeList2 = useMemo(() => SELECTOR_RECRUIT_SUB_TYPE, []);

  return (
    <section>
      <section className="row search__filter">
        <Selector
          data={meatList}
          setItem={(item: number) =>
            setLocation((prev: number[]) => [item, prev[1], prev[2]])
          }
          selectedItem={location[0]}
          className="search__first__selector"
        />

        <Selector
          data={regionList}
          setItem={(item: number) =>
            setLocation((prev: number[]) => [prev[0], item, prev[2]])
          }
          selectedItem={location[1]}
        />

        <Selector
          data={subRegionList[location[1]]}
          setItem={(item: number) =>
            setLocation((prev: number[]) => [item, prev[1], prev[2]])
          }
          selectedItem={location[2]}
        />

        <Selector
          data={togetherTypeList1}
          setItem={(item: number) =>
            setContentType((prev: number[]) => [item, prev[1]])
          }
          selectedItem={contentType[0]}
        />
        <Selector
          data={togetherTypeList2[contentType[0]]}
          setItem={(item: number) =>
            setContentType((prev: number[]) => [prev[0], item])
          }
          selectedItem={contentType[1]}
        />
      </section>

      <section className="search__container">
        <div className="row search__bar__box">
          <input
            type="text"
            placeholder="검색"
            className="search__bar"
            onChange={(e: any) => setSearchTxt(e.target.value)}
          />
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
