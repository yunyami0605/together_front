import { apiCall } from "common/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IBoardBody,
  usePostStudyBoardMutation,
} from "reudx/service/study/board";
import "./TogetherRegister.scss";

function TogetherRegister() {
  const dispatch = useDispatch();

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
  const [tagList, setTagList] = useState(["# TAG"]);
  const [period, setPeriod] = useState("2022-08-22 12:12:10");

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

  useEffect(() => {
    if (isSuccess) {
      navi("/study");
    }

    if (isError) {
      alert("잘못된 폼");
    }
  }, [isSuccess, isLoading, isError]);
  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <section className="page__body">
        <div className="register__form">
          <h3 className="register__field"># Together 종류</h3>
          <select
            onChange={(e: any) => setType(e.target.value)}
            value={type}
            className="register__input"
            name="type"
          >
            <option value="">-- 선택 --</option>
            <option value="study">스터디</option>
            <option value="sideproject">사이드 프로젝트</option>
            <option value="story">이야기</option>
          </select>

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
            onChange={(e: any) => {
              setPersons(Number(e.target.value));
            }}
            value={persons}
            type={"number"}
          />

          <h3 className="register__field"># 기간</h3>
          {/* <input
            className="register__input"
            onChange={(e: any) => setPeriod(e.target.value)}
            value={period}
          /> */}

          {/* <h3 className="register__field"># 태그</h3>
          <input className="register__input" onChange={(e:any)=>setTagList(e.target.value)} value={tagList}/> */}

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
  );
}

export default TogetherRegister;
