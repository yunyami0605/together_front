import Header from "common/header/Header";
import SideHeader from "common/header/SideHeader";
import { Club } from "page/club/Club";
import { Login } from "page/login/Login";
import TogetherModify from "page/register/togetherRegister/TogetherModify";
import { SideProject } from "page/sideProject/SideProject";
import { Story } from "page/story/Story";
import { StudyContent } from "page/content/StudyContent";
import Test from "page/test/Test";
import UserInfo from "page/user/UserInfo";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Study } from "./page/study/Study";
import TogetherRegister from "page/register/togetherRegister/TogetherRegister";
import UserRegister from "page/register/userRegister/UserRegister";
import UserInfoModify from "page/register/userRegister/UserInfoModify";
import KakaoRedirect from "page/login/redirect/KakaoRedirect";

function App() {
  return (
    <section className="page__layout">
      <BrowserRouter>
        <section className="page__layout__left">
          <SideHeader />
        </section>

        <section className="page__layout__right">
          <Header />

          <Routes>
            <Route path="/" element={<Navigate replace to="/study" />} />
            <Route path="/study" element={<Study />} />
            <Route path="/study/:id" element={<StudyContent />} />
            <Route path="/sideproject" element={<SideProject />} />
            <Route path="/club" element={<Club />} />
            <Route path="/together/register" element={<TogetherRegister />} />
            <Route path="/together/modify/:id" element={<TogetherModify />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/info" element={<UserInfo />} />
            <Route path="/test" element={<Test />} />

            <Route path="/login" element={<Login />} />
            <Route path="/login/kakao/redirect" element={<KakaoRedirect />} />

            <Route path="/user/info/modify/:id" element={<UserInfoModify />} />
          </Routes>
        </section>
      </BrowserRouter>
    </section>
  );
}

export default App;
