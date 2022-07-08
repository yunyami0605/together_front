import { apiCall } from "common/api";
import Datepicker from "common/datepicker/Datepicker";
import Dropbox from "common/dropbox/Dropbox";
import PageTitle from "common/title/PageTitle";
import { toNumber } from "common/tool";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostStudyBoardMutation } from "redux/service/study/board";
import { IBoardBody } from "types/board";
import "./TogetherRegister.scss";

function TogetherRegister() {
  /**
    "title": "test5",
    "content": "테스트 문구 5번입니다. 확인해주세요.",
    "type": "study",
    "location": "seoul",
    "persons": 23,
    "tagList": ["test1", "test2"],
    "period": "2022-08-22 12:12:10"
   */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [persons, setPersons] = useState(0);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [period, setPeriod] = useState(moment().format("YYYYMMDD"));

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostStudyBoardMutation();

  const navi = useNavigate();

  const onSubmit = async () => {
    const personsData = Number(persons);
    if (type === "") return alert("종류를 선택해주세요.");
    const body: IBoardBody = {
      title,
      content,
      type,
      location,
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

  const onTagInput = (e: any) => {
    if (e.key === "Enter") {
      if (tagList.length === 6) return;

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

  console.log(type);
  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <PageTitle title="게시글 등록하기" />

      <section className="page__body">
        <section className="page__body__upper">
          <div className="register__form">
            <h3 className="register__field"># Together 종류</h3>
            <Dropbox
              selectedItem={type}
              data={[
                { value: "", txt: "--- 선택 ---" },
                { value: "study", txt: "스터디" },
                { value: "sideproject", txt: "사이드 프로젝트" },
                { value: "story", txt: "이야기" },
              ]}
              onItemClick={(item: string) => {
                console.log(item);
                setType(item);
              }}
            />

            {/* <select
              onChange={(e: any) => setType(e.target.value)}
              value={type}
              className="register__input"
              name="type"
            >
              <option value="">-- 선택 --</option>
              <option value="study">스터디</option>
              <option value="sideproject">사이드 프로젝트</option>
              <option value="story">이야기</option>
            </select> */}

            <h3 className="register__field"># 제목</h3>
            <input
              className="register__input"
              onChange={(e: any) => setTitle(e.target.value)}
              value={title}
            />

            <h3 className="register__field"># 장소</h3>
            <input
              className="register__input"
              onChange={(e: any) => setLocation(e.target.value)}
              value={location}
            />

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
                <div className="end sharp__tag__box">#</div>
                <input
                  className="register__input register__tag__input"
                  onChange={(e: any) => setTag(e.target.value)}
                  onKeyPress={onTagInput}
                  placeholder="태그 입력 + Enter (최대 6개)"
                  value={tag}
                />
              </div>

              <div className="row register__tag__list">
                {tagList.map((val, i) => (
                  <span key={i}># {val}</span>
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
              <button onClick={onSubmit}>
                {isLoading ? "등록중" : "등록하기"}
              </button>
              <button>취소하기</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default TogetherRegister;
