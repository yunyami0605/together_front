import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostRegisterUserMutation } from "redux/service/user";
import "./UserRegister.scss";
import UserRegisterForm from "./common/UserRegisterForm";
import { initUserFormState, tUserFormData } from "./common/constant";

function UserRegister() {
  const navi = useNavigate();

  const [formData, setFormData] = useState<tUserFormData>(initUserFormState);

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostRegisterUserMutation();

  const onSubmit = async () => {
    const body = new FormData();

    if (formData.image) body.append("image", formData.image);
    body.append("password", "test1234");

    Object.entries(formData).map(([key, val]) => {
      let value = null;

      if (key === "image") value = null;
      else if (key === "careerList") value = JSON.stringify(val);
      else value = val;

      if (value) body.append(key, `${value}`);
    });

    const res = await postCredentials(body)
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => console.error("rejected", error));
  };

  useEffect(() => {
    if (isSuccess) {
      navi("/login");
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
          imgPath={""}
          formType="mod"
        />
      </section>
    </section>
  );
}

export default UserRegister;
