import PageTitle from "common/title/PageTitle";
import { toNumber } from "common/tool";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetStudyBoardQuery,
  usePatchStudyBoardMutation,
} from "redux/service/study/board";
import "./TogetherRegister.scss";

import { initFormDataState, tFormData } from "./constant";
import TogetherRegisterForm from "./common/TogetherRegisterForm";
import moment from "moment";

function TogetherModify() {
  const param = useParams() as { id: string };

  const getBoard = useGetStudyBoardQuery(+param.id);

  const [formData, setFormData] = useState<tFormData>(initFormDataState);

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePatchStudyBoardMutation();

  const navi = useNavigate();

  let test = "0";
  console.log(!test);

  const onSubmit = async () => {
    const persons = Number(formData.persons);
    const id = param?.id;

    if (!id) return alert("잘못된 경로입니다. 다시 접근해주세요.");
    if (formData.togetherType === 0)
      return alert("게시글 종류를 선택해주세요.");
    if (formData.location2 === 0 && formData.location1 !== 1)
      return alert("지역을 선택해주세요.");
    if (formData.contentType1 === 0) return alert("모집 분야를 선택해주세요.");

    const data = new FormData();

    // 바뀐 이미지 데이터가 있을 경우, 추가하기
    if (formData.image) data.append("image", formData.image);

    Object.entries(formData).map(([key, val]) => {
      let value = null;
      if (key === "persons" && val) value = val < 0 ? "0" : val.toString();
      else if (key === "tagList") value = JSON.stringify(formData.tagList);
      else if (key === "image") value = null;
      else value = `${val}`;

      if (value) data.append(key, `${value}`);
    });

    const res = await postCredentials({ data, id: toNumber(id) })
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

  useEffect(() => {
    if (getBoard.data && getBoard.isSuccess) {
      const {
        title,
        content,
        togetherType,
        contentType1,
        contentType2,
        persons,
        location1,
        location2,
        location3,
        tagList,
        period,
      } = getBoard.data || initFormDataState;

      const location1Tmp = toNumber(location1) || 0;
      const location2Tmp = toNumber(location2) || 0;

      const location3Tmp = toNumber(location3) || 0;

      const contentType1Tmp = toNumber(contentType1) || 0;
      const contentType2Tmp = toNumber(contentType2) || 0;

      // # 수정 페이지로 접근 할 경우, 해당 board id로 state 저장
      // image 경로 state는 초기화하고, TogetherRegisterForm에서 imgPath props로 넘겨준다.
      // imgPath : 기존 이미지, formData.image : 변경 이미지
      setFormData({
        ...formData,
        title: title || "",
        content: content || "",
        togetherType: togetherType || 0,
        contentType1: contentType1Tmp,
        contentType2: contentType2Tmp,
        location1: location1Tmp,
        location2: location2Tmp,
        location3: location3Tmp,
        persons: persons || 0,
        tagList: tagList || initFormDataState.tagList,
        period: period || moment().format("YYYYMMDD"),
      });
    }
  }, [getBoard.data]);

  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <PageTitle title="게시글 수정하기" />

      <section className="page__body">
        <section className="page__body__upper">
          <TogetherRegisterForm
            formData={formData}
            setFormData={setFormData}
            isLoading={isLoading}
            onSubmit={onSubmit}
            formType={"mod"}
            imgPath={getBoard.data?.imgPath}
          />
        </section>
      </section>
    </section>
  );
}

export default TogetherModify;
