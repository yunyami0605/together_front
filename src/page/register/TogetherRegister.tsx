import Datepicker from "common/datepicker/Datepicker";
import PageTitle from "common/title/PageTitle";
import { toNumber } from "common/tool";
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
  SELECTOR_TOGETHER_TYPE_LIST,
  SELECTOR_RECRUIT_TYPE,
  SELECTOR_RECRUIT_SUB_TYPE,
  SELECTOR_SUB_REGION_LIST,
} from "../../common/constant";
import { DatePicker, message, Upload } from "antd";

function TogetherRegister() {
  const togetherTypeList = useMemo(() => SELECTOR_TOGETHER_TYPE_LIST, []);
  const recruitType = useMemo(() => SELECTOR_RECRUIT_TYPE, []);
  const recruitSubType = useMemo(() => SELECTOR_RECRUIT_SUB_TYPE, []);
  const subRegionList = useMemo(() => SELECTOR_SUB_REGION_LIST, []);

  // 온라인/ 오프라인, 서울, 강서구,
  const meatList = useMemo(() => SELECTOR_MEAT_LIST, []);

  const regionList = useMemo(() => SELECTOR_REGION_LIST, []);

  const LIMIT_TAG_COUNT = 4;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [togetherType, setTogetherType] = useState(0);
  const [contentType, setContentType] = useState([0, 0]);
  const [location, setLocation] = useState([0, 0, 0]);
  const [persons, setPersons] = useState(0);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [period, setPeriod] = useState(moment().format("YYYYMMDD"));
  const [selectedFile, setSelectedFile] = useState<File>();

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostStudyBoardMutation();

  const previewImgRef = useRef<HTMLImageElement | null>(null);
  const previewImgCanvas = useRef<HTMLCanvasElement | null>(null);

  const navi = useNavigate();

  const onSubmit = async () => {
    const personsData = Number(persons);
    if (togetherType === 0) return alert("게시글 종류를 선택해주세요.");
    if (location[1] === 0 && location[0] !== 1)
      return alert("지역을 선택해주세요.");
    if (contentType[0] === 0) return alert("모집 분야를 선택해주세요.");

    if (!selectedFile) return alert("모임 사진을 선택해주세요.");

    const data = new FormData();
    data.append("image", selectedFile);
    data.append("title", title);
    data.append("content", content);
    data.append("togetherType", togetherType.toString());
    data.append("contentType1", contentType[0].toString());
    data.append("contentType2", contentType[1].toString());
    data.append("location1", location[0].toString());
    data.append("location2", location[1].toString());
    data.append("location3", location[2].toString());
    data.append("persons", personsData < 0 ? "0" : personsData.toString());
    data.append("tagList", JSON.stringify(tagList));
    data.append("period", period);

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

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (
    img: any,
    callback: (url: string | ArrayBuffer | null) => void
  ) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (e: any) => {
    console.log(e.target.files[0]);

    setSelectedFile(e.target.files[0]);

    /*
    lastModified: 1659445153409
    lastModifiedDate: Tue Aug 02 2022 21:59:13 GMT+0900 (한국 표준시) {}
    name: "test.jpg"
    size: 68692
    type: "image/jpeg"
    webkitRelativePath: ""
    */

    const file = e.target.files[0];

    // 읽기
    let reader = new FileReader();
    reader.readAsDataURL(file);

    //로드 한 후
    reader.onload = function () {
      console.log(reader.result);

      //로컬 이미지를 보여주기
      if (previewImgRef.current) {
        previewImgRef.current.src = `${reader.result}`;
      }
    };

    /*
    getBase64(file.originFileObj, (url: string | ArrayBuffer | null) => {
        setImageUrl(url);
      });
    */
  };

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
              setItem={setTogetherType}
              selectedItem={togetherType}
            />

            <h3 className="register__field"># 모집 분야</h3>
            <Selector
              data={recruitType}
              setItem={(item) => setContentType((prev) => [item, prev[1]])}
              selectedItem={contentType[0]}
            />

            <h3 className="register__field"># 모집 세부 분야</h3>
            <Selector
              data={recruitSubType[contentType[0]]}
              setItem={(item) => setContentType((prev) => [prev[0], item])}
              selectedItem={contentType[1]}
            />

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
                  setLocation((prev) => [item, prev[1], prev[2]])
                }
                selectedItem={location[0]}
              />

              {location[0] !== 1 && (
                <Selector
                  data={regionList}
                  setItem={(item: number) =>
                    setLocation((prev) => [prev[0], item, prev[2]])
                  }
                  selectedItem={location[1]}
                />
              )}

              {location[0] !== 1 && (
                <Selector
                  data={subRegionList[location[1]]}
                  setItem={(item: number) =>
                    setLocation((prev) => [prev[0], prev[1], item])
                  }
                  selectedItem={location[2]}
                />
              )}
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

            <h3 className="register__field"># 이미지 업로드</h3>

            <div className="center img__upload">
              <input type="file" name="file" onChange={handleChange} />
              <label>이미지 선택</label>
            </div>

            <img
              ref={previewImgRef}
              id="img__upload__preview"
              className="img__upload__preview"
              alt="t"
              src=""
            />

            {/* <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p> */}

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

export default TogetherRegister;
