import Datepicker from "common/datepicker/Datepicker";
import PageTitle from "common/title/PageTitle";
import { findValueOnObjArray, toNumber } from "common/tool";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetStudyBoardQuery,
  usePostStudyBoardMutation,
} from "redux/service/study/board";
import { IBoardBody } from "types/board";
import "./TogetherRegister.scss";
import Selector from "common/selector/Selector";
import {
  SELECTOR_MEAT_LIST,
  SELECTOR_REGION_LIST,
  SELECTOR_TYPE_LIST,
} from "./component/constant";

function TogetherModify() {
  const typeList = useMemo(() => SELECTOR_TYPE_LIST, []);

  // 온라인/ 오프라인, 서울, 강서구,
  const meatList = useMemo(() => SELECTOR_MEAT_LIST, []);

  const regionList = useMemo(() => SELECTOR_REGION_LIST, []);

  const LIMIT_TAG_COUNT = 4;

  const param = useParams() as { id: string };

  const getBoard = useGetStudyBoardQuery(+param.id);

  // const onSplitTagList= (tagList?:string) => {
  //   if(!tagList) return undefined;

  //   tagList.split(";");
  // }

  // function test<T extends { [_key: string]: any }[]>(
  //   arr: T[],
  //   key: string,
  //   findItem: any
  // ) {
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i][key] === findItem) {
  //       return i;
  //     }
  //   }

  //   return undefined;
  // }

  const [title, setTitle] = useState(getBoard.data?.title || "");
  const [content, setContent] = useState(getBoard.data?.content || "");
  const [type, setType] = useState(getBoard.data?.type || 0);

  const [location, setLocation] = useState([
    toNumber(getBoard.data?.location.split(";")[0]) || 0,
    toNumber(getBoard.data?.location.split(";")[1]) || 0,
  ]);

  const [persons, setPersons] = useState(getBoard.data?.persons || 0);
  const [tagList, setTagList] = useState<string[]>(
    getBoard.data?.tagList || []
  );
  const [tag, setTag] = useState("");
  const [period, setPeriod] = useState(
    getBoard.data?.period || moment().format("YYYYMMDD")
  );

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostStudyBoardMutation();

  const navi = useNavigate();

  const onSubmit = async () => {
    const personsData = Number(persons);
    if (type === 0) return alert("종류를 선택해주세요.");
    const body: IBoardBody = {
      title,
      content,
      type: 0,
      location: `${location[0]};${location[1]}`,
      persons: personsData < 0 ? 0 : personsData,
      tagList,
      period,
    };
    const res = await postCredentials(body)
      .unwrap()
      .then((payload) => console.log("fulfilled", payload))
      .catch((error) => console.error("rejected", error));
  };

  const onChangePerson = (e: any) => {
    const personCount = toNumber(e.target.value);

    if (personCount < 0 || personCount > 100) {
      return alert("모집 인원은 0 ~ 100 사이로 설정해주세요.");
    }
    setPersons(personCount);
  };

  const onDeleteTag = (index: number) => {
    const deletedTagList = tagList.filter((val, i) => index !== i);
    setTagList(deletedTagList);
  };

  const onTagInput = (e: any) => {
    if (e.key === "Enter") {
      if (tagList.length === LIMIT_TAG_COUNT) return;

      setTagList((prev) => [...prev, tag]);
      setTag("");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navi("/study");
    }

    if (isError) {
      alert("잘못된 폼");
    }
  }, [isSuccess, isLoading, isError]);

  useEffect(() => {
    if (getBoard) {
      // # 수정 페이지로 접근 할 경우, 해당 board id 조회
      // getBoard
    }
  }, []);

  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <PageTitle title="게시글 등록하기" />

      <section className="page__body">
        <section className="page__body__upper">
          <div className="register__form">
            <h3 className="register__field"># Together 종류</h3>

            <Selector data={typeList} setItem={setType} selectedItem={type} />

            <h3 className="register__field"># 제목</h3>
            <input
              className="register__input"
              onChange={(e: any) => setTitle(e.target.value)}
              value={title}
            />

            <h3 className="register__field"># 장소</h3>
            <div className="row register__location__line">
              <Selector
                data={meatList}
                setItem={(item: number) =>
                  setLocation((prev) => [item, prev[1]])
                }
                selectedItem={location[0]}
              />

              <Selector
                data={regionList}
                setItem={(item: number) =>
                  setLocation((prev) => [prev[0], item])
                }
                selectedItem={location[1]}
              />
            </div>

            <h3 className="register__field"># 인원</h3>
            <input
              className="register__input"
              onChange={onChangePerson}
              value={persons}
              type={"number"}
            />

            <h3 className="register__field"># 모집 마감일</h3>
            <Datepicker
              defaultDate={period}
              setDate={(date: string) => setPeriod(date)}
            />

            <h3 className="register__field"># 태그</h3>
            <div>
              <div className="row">
                <div className="relative end sharp__tag__box">#</div>
                <input
                  className="register__input register__tag__input"
                  onChange={(e: any) => setTag(e.target.value)}
                  onKeyPress={onTagInput}
                  placeholder={`태그 입력 + Enter (최대 ${LIMIT_TAG_COUNT}개)`}
                  value={tag}
                />
              </div>

              <div className="row flex register__tag__list">
                {tagList.map((val, i) => (
                  <div className="center register__tag" key={i}>
                    # {val} <button onClick={() => onDeleteTag(i)}>x</button>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="register__field"># 설명</h3>
            <textarea
              className="register__desc"
              onChange={(e: any) => setContent(e.target.value)}
              value={content}
            />

            <div className="center register__btnlist">
              <button className="positive__btn" onClick={onSubmit}>
                {isLoading ? "등록중" : "등록하기"}
              </button>
              <button className="negative__btn">취소하기</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default TogetherModify;
