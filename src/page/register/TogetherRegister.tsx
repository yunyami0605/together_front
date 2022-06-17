import "./TogetherRegister.scss";

function TogetherRegister() {
  return (
    <section className="page">
      <section className="page__body">
        <div className="register__form">
          <h3 className="register__field"># Together 종류</h3>
          <input className="register__input" />

          <h3 className="register__field"># 제목</h3>
          <input className="register__input" />

          <h3 className="register__field"># 장소</h3>
          <input className="register__input" />

          <h3 className="register__field"># 인원</h3>
          <input className="register__input" />

          <h3 className="register__field"># 기간</h3>
          <input className="register__input" />

          <h3 className="register__field"># 태그</h3>
          <input className="register__input" />

          <h3 className="register__field"># 설명</h3>
          <textarea className="register__desc" />

          <div className="center register__btnlist">
            <button>등록하기</button>
            <button>취소하기</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default TogetherRegister;
