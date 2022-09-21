import PageTitle from "common/title/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStudyBoardMutation } from "redux/service/study/board";
import TogetherRegisterForm from "./common/TogetherRegisterForm";
import { initFormDataState, tFormData } from "./constant";
import "./TogetherRegister.scss";

function TogetherRegister() {
  const navi = useNavigate();

  const [formData, setFormData] = useState<tFormData>(initFormDataState);

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostStudyBoardMutation();

  // board register to submit on event handler
  const onSubmit = async () => {
    const persons = Number(formData.persons);
    if (formData.togetherType === 0)
      return alert("게시글 종류를 선택해주세요.");
    if (formData.location2 === 0 && formData.location1 !== 1)
      return alert("지역을 선택해주세요.");
    if (formData.contentType1 === 0) return alert("모집 분야를 선택해주세요.");

    if (!formData.image) return alert("모임 사진을 선택해주세요.");

    const data = new FormData();
    data.append("image", formData.image);

    Object.entries(formData).map(([key, val]) => {
      let value = null;
      if (key === "persons" && val) value = val < 0 ? "0" : val.toString();
      else if (key === "tagList") value = JSON.stringify(formData.tagList);
      else if (key === "image") value = null;
      else value = `${val}`;

      if (value) data.append(key, `${value}`);
    });

    const res = await postCredentials(data)
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

      <PageTitle title="게시글 등록하기" />

      <section className="page__body">
        <section className="page__body__upper">
          <TogetherRegisterForm
            formData={formData}
            setFormData={setFormData}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </section>
      </section>
    </section>
  );
}

export default TogetherRegister;
