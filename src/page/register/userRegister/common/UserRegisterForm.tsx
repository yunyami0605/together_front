import {
  SELECTOR_RECRUIT_SUB_TYPE,
  SELECTOR_RECRUIT_TYPE,
  SELECTOR_REGION_LIST,
  SELECTOR_SUB_REGION_LIST,
} from "common/constant";
import Selector from "common/selector/Selector";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { tUserFormData } from "./constant";
import "./UserRegisterForm.scss";

interface IProps {
  setFormData: React.Dispatch<React.SetStateAction<tUserFormData>>;
  formData: tUserFormData;
  isLoading: boolean;
  onSubmit: () => Promise<void>;
  formType?: "add" | "mod";
  imgPath?: string | null;
}

export default function UserRegisterForm({
  setFormData,
  formData,
  isLoading,
  onSubmit,
  imgPath,
  formType = "add",
}: IProps) {
  const [career1, setCareer1] = useState(0);
  const [career2, setCareer2] = useState(0);

  const previewImgRef = useRef<HTMLImageElement | null>(null);
  const careerType = useMemo(() => SELECTOR_RECRUIT_TYPE, []);
  const careerSubType = useMemo(() => SELECTOR_RECRUIT_SUB_TYPE, []);

  // 온라인/ 오프라인, 서울, 강서구,
  const regionList = useMemo(() => SELECTOR_REGION_LIST, []);
  const subRegionList = useMemo(() => SELECTOR_SUB_REGION_LIST, []);
  const registerOrModifyTxt = useMemo(
    () => (formType === "add" ? "등록" : "수정"),
    []
  );

  const [isVisibleImg, setVisibleImg] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedImgSrc, setSelectedImgSrc] = useState(imgPath || "");

  const onChangeImg = (event: any) => {
    const file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);

    //로드 한 후
    reader.onload = function () {
      //로컬 이미지를 보여주기
      if (previewImgRef.current) {
        const imgLocalPath = `${reader.result}`;
        previewImgRef.current.src = imgLocalPath;
        setSelectedImgSrc(imgLocalPath);
        setFormData({ ...formData, image: file });
        setVisibleImg(true);
      }
    };

    setSelectedFile(event.target.files[0]);
  };

  const onAddCareerList = () => {
    if (career1 === 0) return alert("경력을 설정해주세요.");

    setFormData({
      ...formData,
      careerList: [...formData.careerList, [career1, career2]],
    });

    setCareer1(0);
    setCareer2(0);
  };

  const onDeleteCareeerList = (index: number) => {
    const careerListTmp = [...formData.careerList];

    const res = careerListTmp.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      careerList: res,
    });
  };

  useEffect(() => {
    if (previewImgRef.current && imgPath) {
      previewImgRef.current.src = `${process.env.REACT_APP_API_BASE_URL}/${imgPath}`;
    }
  }, [imgPath]);

  return (
    <div className="register__form">
      <h3 className="register__field"># 이메일</h3>
      <input
        className="register__input"
        onChange={(e: any) =>
          setFormData({ ...formData, email: e.target.value })
        }
        value={formData.email}
      />

      <h3 className="register__field"># 별명</h3>
      <input
        className="register__input"
        onChange={(e: any) =>
          setFormData({ ...formData, nickname: e.target.value })
        }
        value={formData.nickname}
      />

      <h3 className="register__field"># 경력</h3>

      <div className="row form_user_info_career">
        <Selector
          data={careerType}
          setItem={(item) => setCareer1(item)}
          selectedItem={career1}
        />

        <Selector
          data={careerSubType[career1]}
          setItem={(item) => setCareer2(item)}
          selectedItem={career2}
        />

        <button onClick={onAddCareerList}>추가</button>
      </div>

      <div className="career_container">
        {formData.careerList.map((item, i) => (
          <div className="row career_item" key={i}>
            <p>{i + 1}.</p>
            <p>{careerType[item[0]].label}</p>

            <div />

            <p>{careerSubType[item[0]][item[1]].label}</p>

            <button
              className="btn_career_item_delete"
              onClick={() => onDeleteCareeerList(i)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      <h3 className="register__field"># 거주지</h3>

      <div className="row form_user_info_career">
        <Selector
          data={regionList}
          setItem={(item) => setFormData({ ...formData, location1: item })}
          selectedItem={formData.location1}
        />

        <Selector
          data={subRegionList[formData.location1]}
          setItem={(item) => setFormData({ ...formData, location2: item })}
          selectedItem={formData.location2}
        />
      </div>

      <h3 className="register__field"># 프로필</h3>

      <div className="center img_user_profile_box">
        <input
          type="file"
          accept="image/*"
          name="file"
          onChange={onChangeImg}
        />

        {!selectedFile && (
          <img
            className={"img_no_user_profile"}
            alt="img_no_user_profile"
            src={`${process.env.REACT_APP_HOST_BASE_URL}/img/icon/img__default__user__icon.png`}
          />
        )}

        <img
          ref={previewImgRef}
          alt="pre_img_profile"
          className={
            "img_user_profile" +
            (isVisibleImg ? "" : " no__img__upload__preview")
          }
          src={selectedImgSrc}
        />
      </div>

      <div className="center register__btnlist">
        <button className="positive__btn" onClick={onSubmit}>
          {`${registerOrModifyTxt}${isLoading ? "중" : "하기"}`}
        </button>

        <button className="negative__btn">취소하기</button>
      </div>
    </div>
  );
}
