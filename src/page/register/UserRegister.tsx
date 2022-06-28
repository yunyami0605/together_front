import { apiCall } from "common/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IBoardBody,
  usePostStudyBoardMutation,
} from "reudx/service/study/board";
import {
  IUserRegisterBody,
  usePostRegisterUserMutation,
} from "reudx/service/study/user";
import "./UserRegister.scss";

function UserRegister() {
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
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");

  const [postCredentials, { isSuccess, isLoading, isError }] =
    usePostRegisterUserMutation();

  const navi = useNavigate();

  const onSubmit = async () => {
    const body: IUserRegisterBody = {
      email,
      password,
      nickname,
    };
    const res = await postCredentials(body)
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => console.error("rejected", error));
  };

  useEffect(() => {
    if (isSuccess) {
      navi("/study");
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
            onChange={(e: any) => setemail(e.target.value)}
            value={email}
          />

          <h3 className="register__field"># 패스워드</h3>
          <input
            className="register__input"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />

          <h3 className="register__field"># 패스워드 확인</h3>
          <input
            className="register__input"
            onChange={(e: any) => setPassword2(e.target.value)}
            value={password2}
          />

          <h3 className="register__field"># 별명</h3>
          <input
            className="register__input"
            onChange={(e: any) => setNickname(e.target.value)}
            value={nickname}
          />

          <div className="center register__btnlist">
            <button onClick={onSubmit}>
              {isLoading ? "등록중" : "회원가입"}
            </button>
            <button>취소하기</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default UserRegister;
