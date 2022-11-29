import {
  SELECTOR_MEAT_LIST,
  SELECTOR_RECRUIT_SUB_TYPE,
  SELECTOR_RECRUIT_TYPE,
  SELECTOR_REGION_LIST,
  SELECTOR_SUB_REGION_LIST,
  SELECTOR_TOGETHER_TYPE_LIST,
} from "common/constant";
import Datepicker from "common/datepicker/Datepicker";
import Selector from "common/selector/Selector";
import { toNumber } from "common/tool";
import { useEffect, useMemo, useRef, useState } from "react";
import Editor from "../../common/editor/Editor";
import { tFormData } from "../constant";
import "./TogetherRegisterForm.scss";

interface IProps {
  setFormData: React.Dispatch<React.SetStateAction<tFormData>>;
  formData: tFormData;
  isLoading: boolean;
  onSubmit: () => Promise<void>;
  formType?: "add" | "mod";
  imgPath?: string | null;
}

/**
 * @description 게시글 등록 폼
 * @param setFormData - form data state 설정
 * @param formData - form data state
 * @param isLoading - form api 요청 중인지 여부
 * @param formType - add 면 등록, mod 면 수정
 * @param imgPath - 게시글을 등록할 대표 이미지
 */
export default function TogetherRegisterForm({
  setFormData,
  formData,
  isLoading,
  onSubmit,
  imgPath,
  formType = "add",
}: IProps) {
  // 등록 페이지 타입
  const togetherTypeList = useMemo(() => SELECTOR_TOGETHER_TYPE_LIST, []);

  // 모집 분야
  const recruitType = useMemo(() => SELECTOR_RECRUIT_TYPE, []);

  // 모집 세부 분야
  const recruitSubType = useMemo(() => SELECTOR_RECRUIT_SUB_TYPE, []);
  const subRegionList = useMemo(() => SELECTOR_SUB_REGION_LIST, []);

  // 온라인/ 오프라인, 서울, 강서구,
  const meatList = useMemo(() => SELECTOR_MEAT_LIST, []);
  const regionList = useMemo(() => SELECTOR_REGION_LIST, []);

  const registerOrModifyTxt = useMemo(
    () => (formType === "add" ? "등록" : "수정"),
    []
  );

  // 태그 제한 갯수
  const LIMIT_TAG_COUNT = 4;

  const previewImgRef = useRef<HTMLImageElement | null>(null);

  const [tag, setTag] = useState("");
  const [isVisibleImg, setVisibleImg] = useState(false);

  // 모집 인원 수정
  const onChangePerson = (e: any) => {
    const personCount = toNumber(e.target.value);

    if (personCount < 0 || personCount > 100) {
      return alert("모집 인원은 0 ~ 100 사이로 설정해주세요.");
    }
    setFormData({ ...formData, persons: personCount });
  };

  /**
   *@description : delete tag state to event handler
   */
  const onDeleteTag = (index: number) => {
    const deletedTagList = formData.tagList.filter((_, i) => index !== i);
    setFormData({ ...formData, tagList: deletedTagList });
  };

  /**
   *@description : img change to event handler
   */
  const onChangeImg = (e: any) => {
    setFormData({ ...formData, image: e.target.files[0] });

    const file = e.target.files[0];
    // 읽기
    let reader = new FileReader();
    reader.readAsDataURL(file);

    //로드 한 후
    reader.onload = function () {
      //로컬 이미지를 보여주기
      if (previewImgRef.current) {
        previewImgRef.current.src = `${reader.result}`;
        setVisibleImg(true);
      }
    };
  };

  const onTagInput = (e: any) => {
    if (e.key === "Enter") {
      if (formData.tagList.length === LIMIT_TAG_COUNT) return;

      setFormData((prev) => ({ ...formData, tagList: [...prev.tagList, tag] }));
      setTag("");
    }
  };

  /**
   *@description : change content to event handler
   */
  const onChangeContents = (value: string) => {
    setFormData({ ...formData, content: value });
  };

  useEffect(() => {
    if (previewImgRef.current && imgPath) {
      previewImgRef.current.src = `${process.env.REACT_APP_API_BASE_URL}/${imgPath}`;
    }
  }, [imgPath]);

  return (
    <div className="register__form">
      <h3 className="register__field"># Together 종류</h3>
      <Selector
        data={togetherTypeList}
        setItem={(item) => setFormData({ ...formData, togetherType: item })}
        selectedItem={formData.togetherType}
      />

      <h3 className="register__field"># 모집 분야</h3>
      <Selector
        data={recruitType}
        setItem={(item) =>
          setFormData({
            ...formData,
            contentType1: item,
          })
        }
        selectedItem={formData.contentType1}
      />

      <h3 className="register__field"># 모집 세부 분야</h3>
      <Selector
        data={recruitSubType[formData.contentType1]}
        setItem={(item) =>
          setFormData({
            ...formData,
            contentType2: item,
          })
        }
        selectedItem={formData.contentType2}
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
            setFormData({
              ...formData,
              location1: item,
            })
          }
          selectedItem={formData.location1}
        />

        {formData.location1 !== 1 && (
          <Selector
            data={regionList}
            setItem={(item) =>
              setFormData({
                ...formData,
                location2: item,
              })
            }
            selectedItem={formData.location2}
          />
        )}

        {formData.location1 !== 1 && (
          <Selector
            data={subRegionList[formData.location2]}
            setItem={(item) =>
              setFormData({
                ...formData,
                location3: item,
              })
            }
            selectedItem={formData.location3}
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
      <Editor contents={formData.content} setContents={onChangeContents} />

      <h3 className="register__field"># 이미지 업로드</h3>

      <div className="center img__upload">
        <input type="file" name="file" onChange={onChangeImg} />
        <label>이미지 선택</label>
      </div>

      <img
        ref={previewImgRef}
        id="img__upload__preview"
        className={
          "img__upload__preview" +
          (isVisibleImg ? "" : " no__img__upload__preview")
        }
        alt="t"
        src=""
      />

      <div className="center register__btnlist">
        <button type="submit" className="positive__btn" onClick={onSubmit}>
          {`${registerOrModifyTxt}${isLoading ? "중" : "하기"}`}
        </button>
        <button className="negative__btn">취소하기</button>
      </div>
    </div>
  );
}
