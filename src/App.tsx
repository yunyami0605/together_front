import Header from "common/header/Header";
import { Club } from "page/club/Club";
import { Login } from "page/login/Login";
import TogetherRegister from "page/register/TogetherRegister";
import UserRegister from "page/register/UserRegister";
import { SideProject } from "page/sideProject/SideProject";
import { Story } from "page/story/Story";
import { StudyContent } from "page/study/StudyContent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Study } from "./page/study/Study";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Navigate replace to="/study" />} />
          <Route path="/study" element={<Study />} />
          <Route path="/study/:id" element={<StudyContent />} />
          <Route path="/sideproject" element={<SideProject />} />
          <Route path="/club" element={<Club />} />
          <Route path="/story" element={<Story />} />
          <Route path="/together/register" element={<TogetherRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/register" element={<UserRegister />} />
          UserRegister
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
