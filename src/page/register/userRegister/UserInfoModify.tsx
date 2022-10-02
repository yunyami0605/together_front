import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery, usePatchUserMutation } from "redux/service/user";
import { initUserFormState, tUserFormData } from "./common/constant";
import UserRegisterForm from "./common/UserRegisterForm";
import "./UserInfoModify.scss";

/**
 *@description user info modify page
 */
function UserInfoModify() {
  const navi = useNavigate();

  const [formData, setFormData] = useState<tUserFormData>(initUserFormState);

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePatchUserMutation();

  const param = useParams() as { id: string };

  const getUser = useGetUserQuery(+param.id);

  /**
   *@description summit handler to modify form
   */
  const onSubmit = async () => {
    if (!param?.id) return alert("잘못된 접근입니다.");

    const body = new FormData();
    if (formData.image) body.append("image", formData.image);

    Object.entries(formData).map(([key, val]) => {
      let value = null;

      if (key === "image") value = null;
      else if (key === "careerList") value = JSON.stringify(val);
      else value = val;

      if (value) body.append(key, `${value}`);
    });

    const res = await postCredentials({ body, id: param.id })
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => console.error("rejected", error));
  };

  // const handleSubmission = () => {
  //   var data = new FormData();
  //   if (selectedFile) data.append("image", selectedFile);
  //   console.log(selectedFile);
  //   fetch("http://localhost:3000/api/study/board/4/upload", {
  //     method: "POST",
  //     body: data,
  //   });
  // };

  useEffect(() => {
    if (getUser.data) {
      setFormData({
        nickname: getUser.data?.nickname || "",
        email: getUser.data?.email || "",
        location1: getUser.data?.location1 || 0,
        location2: getUser.data?.location2 || 0,
        careerList: getUser.data?.careerList || [],
        image: undefined,
      });
    }
  }, [getUser.data]);

  useEffect(() => {
    if (isSuccess) {
      getUser.refetch();
      navi("/user/info");
    }

    if (isError) {
      alert("잘못된 폼");
    }
  }, [isSuccess, isError]);

  return (
    <section className="page">
      {isLoading && <h1 className="loading__txt">LOADING...</h1>}

      <section className="page__body">
        <UserRegisterForm
          setFormData={setFormData}
          formData={formData}
          isLoading={isLoading}
          onSubmit={onSubmit}
          imgPath={getUser.data?.imgPath}
          formType="mod"
        />
      </section>
    </section>
  );
}

export default UserInfoModify;
