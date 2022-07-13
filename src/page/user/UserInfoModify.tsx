import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery, usePatchUserMutation } from "redux/service/user";
import "./UserInfoModify.scss";

function UserInfoModify() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePatchUserMutation();

  const param = useParams() as { id: string };

  const getUser = useGetUserQuery(+param.id);

  const navi = useNavigate();

  const onSubmit = async () => {
    if (!param?.id) return alert("잘못된 접근입니다.");
    const body = {
      email,
      nickname,
    };

    const res = await postCredentials({ body, id: param.id })
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => console.error("rejected", error));
  };

  useEffect(() => {
    if (getUser.data) {
      setNickname(getUser.data?.nickname);
      setEmail(getUser.data?.email);
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
        <div className="register__form">
          <h3 className="register__field"># 이메일</h3>
          <input
            className="register__input"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />

          <h3 className="register__field"># 별명</h3>
          <input
            className="register__input"
            onChange={(e: any) => setNickname(e.target.value)}
            value={nickname}
          />

          <div className="center register__btnlist">
            <button className="positive__btn" onClick={onSubmit}>
              {isLoading ? "수정중" : "수정하기"}
            </button>
            <button className="negative__btn">취소하기</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default UserInfoModify;
