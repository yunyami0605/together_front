import Datepicker from "common/datepicker/Datepicker";
import PageTitle from "common/title/PageTitle";
import { toNumber } from "common/tool";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStudyBoardMutation } from "redux/service/study/board";
import "./TogetherRegister.scss";
import Selector from "common/selector/Selector";
import {
  SELECTOR_MEAT_LIST,
  SELECTOR_REGION_LIST,
  SELECTOR_TOGETHER_TYPE_LIST,
  SELECTOR_RECRUIT_TYPE,
  SELECTOR_RECRUIT_SUB_TYPE,
  SELECTOR_SUB_REGION_LIST,
} from "../../common/constant";
import Editor from "./common/Editor";

function TogetherRegister() {
  const togetherTypeList = useMemo(() => SELECTOR_TOGETHER_TYPE_LIST, []);
  const recruitType = useMemo(() => SELECTOR_RECRUIT_TYPE, []);
  const recruitSubType = useMemo(() => SELECTOR_RECRUIT_SUB_TYPE, []);
  const subRegionList = useMemo(() => SELECTOR_SUB_REGION_LIST, []);

  // 온라인/ 오프라인, 서울, 강서구,
  const meatList = useMemo(() => SELECTOR_MEAT_LIST, []);
  const regionList = useMemo(() => SELECTOR_REGION_LIST, []);

  // 태그 제한
  const LIMIT_TAG_COUNT = 4;

  const navi = useNavigate();

  // post form init data
  const initFromDataState = {
    title: "",
    content: "",
    togetherType: 0,
    contentType: [0, 0],
    location: [0, 0, 0],
    persons: 0,
    tagList: [] as string[],
    period: moment().format("YYYYMMDD"),
    file: undefined as File | undefined,
  };

  type tFormData = typeof initFromDataState;

  const [formData, setFormData] = useState<tFormData>(initFromDataState);
  const [tag, setTag] = useState("");

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostStudyBoardMutation();

  const previewImgRef = useRef<HTMLImageElement | null>(null);

  // board register to submit on event handler
  const onSubmit = async () => {
    const personsData = Number(formData.persons);
    if (formData.togetherType === 0)
      return alert("게시글 종류를 선택해주세요.");
    if (formData.location[1] === 0 && formData.location[0] !== 1)
      return alert("지역을 선택해주세요.");
    if (formData.contentType[0] === 0)
      return alert("모집 분야를 선택해주세요.");

    if (!formData.file) return alert("모임 사진을 선택해주세요.");

    const data = new FormData();
    data.append("image", formData.file);
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("togetherType", formData.togetherType.toString());
    data.append("contentType1", formData.contentType[0].toString());
    data.append("contentType2", formData.contentType[1].toString());
    data.append("location1", formData.location[0].toString());
    data.append("location2", formData.location[1].toString());
    data.append("location3", formData.location[2].toString());
    data.append("persons", personsData < 0 ? "0" : personsData.toString());
    data.append("tagList", JSON.stringify(formData.tagList));
    data.append("period", formData.period);

    const res = await postCredentials(data)
      .unwrap()
      .then((payload) => console.log("fulfilled", payload))
      .catch((error) => console.error("rejected", error));
  };

  const onChangePerson = (e: any) => {
    const personCount = toNumber(e.target.value);

    if (personCount < 0 || personCount > 100) {
      return alert("모집 인원은 0 ~ 100 사이로 설정해주세요.");
    }
    setFormData({ ...formData, persons: personCount });
  };

  const onDeleteTag = (index: number) => {
    const deletedTagList = formData.tagList.filter((val, i) => index !== i);
    setFormData({ ...formData, tagList: deletedTagList });
  };

  const onTagInput = (e: any) => {
    if (e.key === "Enter") {
      if (formData.tagList.length === LIMIT_TAG_COUNT) return;

      setFormData((prev) => ({ ...formData, tagList: [...prev.tagList, tag] }));
      setTag("");
    }
  };

  /**
   *@description : img change to event handler
   */
  const onChangeImg = (e: any) => {
    setFormData({ ...formData, file: e.target.files[0] });

    const file = e.target.files[0];

    // 읽기
    let reader = new FileReader();
    reader.readAsDataURL(file);

    //로드 한 후
    reader.onload = function () {
      //로컬 이미지를 보여주기
      if (previewImgRef.current) {
        previewImgRef.current.src = `${reader.result}`;
      }
    };
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

      <PageTitle title="게시글 등록하기" />

      <section className="page__body">
        <section className="page__body__upper">
          <div className="register__form">
            <h3 className="register__field"># Together 종류</h3>
            <Selector
              data={togetherTypeList}
              setItem={(item) =>
                setFormData({ ...formData, togetherType: item })
              }
              selectedItem={formData.togetherType}
            />

            <h3 className="register__field"># 모집 분야</h3>
            <Selector
              data={recruitType}
              setItem={(item) =>
                setFormData(({ contentType }) => ({
                  ...formData,
                  contentType: [item, contentType[1]],
                }))
              }
              selectedItem={formData.contentType[0]}
            />

            <h3 className="register__field"># 모집 세부 분야</h3>
            <Selector
              data={recruitSubType[formData.contentType[0]]}
              setItem={(item) =>
                setFormData(({ contentType }) => ({
                  ...formData,
                  contentType: [contentType[0], item],
                }))
              }
              selectedItem={formData.contentType[1]}
            />

            <h3 className="register__field"># 제목</h3>
            <input
              className="register__input"
              onChange={(e: any) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />

            <h3 className="register__field"># 장소</h3>
            <div className="row register__location__line">
              <Selector
                data={meatList}
                setItem={(item) =>
                  setFormData(({ location }) => ({
                    ...formData,
                    location: [item, location[1], location[2]],
                  }))
                }
                selectedItem={formData.location[0]}
              />

              {formData.location[0] !== 1 && (
                <Selector
                  data={regionList}
                  setItem={(item) =>
                    setFormData(({ location }) => ({
                      ...formData,
                      location: [location[0], item, location[2]],
                    }))
                  }
                  selectedItem={formData.location[1]}
                />
              )}

              {formData.location[0] !== 1 && (
                <Selector
                  data={subRegionList[formData.location[1]]}
                  setItem={(item) =>
                    setFormData(({ location }) => ({
                      ...formData,
                      location: [location[0], location[1], item],
                    }))
                  }
                  selectedItem={formData.location[2]}
                />
              )}
            </div>

            <h3 className="register__field"># 인원</h3>
            <input
              className="register__input"
              onChange={onChangePerson}
              value={formData.persons}
              type={"number"}
            />

            <h3 className="register__field"># 모집 마감일</h3>
            <Datepicker
              defaultDate={formData.period}
              setDate={(date) => setFormData({ ...formData, period: date })}
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
                {formData.tagList.map((val, i) => (
                  <div className="center register__tag" key={i}>
                    # {val} <button onClick={() => onDeleteTag(i)}>x</button>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="register__field"># 설명</h3>
            <textarea
              className="register__desc"
              onChange={(e: any) =>
                setFormData({ ...formData, content: e.target.value })
              }
              value={formData.content}
            />

            <Editor />

            <h3 className="register__field"># 이미지 업로드</h3>

            <div className="center img__upload">
              <input type="file" name="file" onChange={onChangeImg} />
              <label>이미지 선택</label>
            </div>

            <img
              ref={previewImgRef}
              id="img__upload__preview"
              className="img__upload__preview"
              alt="t"
              src=""
            />

            <div className="center register__btnlist">
              <button
                type="submit"
                className="positive__btn"
                onClick={onSubmit}
              >
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

export default TogetherRegister;
