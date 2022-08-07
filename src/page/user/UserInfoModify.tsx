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

  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

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

  const handleSubmission = () => {
    var data = new FormData();
    data.append("image", selectedFile);
    console.log(selectedFile);
    fetch("http://localhost:3000/api/study/board/4/upload", {
      method: "POST",
      body: data,
    });
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

          <input type="file" name="file" onChange={changeHandler} />
          {isFilePicked ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
          <div>
            <button onClick={handleSubmission}>Submit</button>
          </div>

          <img
            alt="t"
            src="http://www.localhost:3000/files\\8eb319948c840c7a55d8f1a6ff961cb6.jpg"
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
