import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useKakaoLoginMutation } from "redux/service/user";

function getCookie(name: string) {
  var parts = document.cookie.split(name + "=");
  if (parts.length === 2) {
    return parts[1].split(";")[0];
  }
}

/**
 *@description kakao redirect 공부 위한 페이지 (현재 로직 상에서는 안쓰임)
 */
export default function KakaoRedirect() {
  var token = getCookie("authorize-access-token");
  const oauth = window.Kakao.Auth.getAccessToken();
  const params = useParams();
  const location = useLocation();
  const [kakaoLogin, _] = useKakaoLoginMutation();

  const REST_API_KEY = "74fb6f2aed29cc25da9b5f5def026754"; //js key
  // const REST_API_KEY = "97598f876fed89fe6dc07b58034b0491";

  const REDIRECT_URI = `${process.env.REACT_APP_HOST_BASE_URL}/login/kakao/redirect`;
  const AUTHORIZE_CODE = location.search.split("=")[1];

  const url = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`;

  useEffect(() => {
    async function test() {
      const res = await axios.post(`https://kauth.kakao.com/oauth/token`, url, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      /*
      access_token: string 
      expires_in: number
      refresh_token: string
      refresh_token_expires_in: number
      scope: "gender profile_nickname"
      token_type: "bearer"
      */

      if (res.data?.access_token) {
        // const body = new FormData();
        // body.append("access_token", res.data.access_token);

        const body = {
          access_token: res.data.access_token,
        };

        const res2 = await kakaoLogin(body)
          .unwrap()
          .then((payload) => console.log(payload))
          .catch((error) => console.log(error));
      }
    }

    test();
  }, []);

  return <div>kakao redirect</div>;
}
