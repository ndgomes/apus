import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { BadgeCheck } from "lucide-react";

interface userinfoInterface {
  id: number;
  username: string;
  email: string;
}

export const DashboardPage: React.FC = () => {
  const { authToken, setLoading, callLogout } = useContext(AuthContext);

  const [userInfos, setUserInfos] = useState<userinfoInterface>();

  useEffect(() => {
    axios
      .get<userinfoInterface>("https://verifyme.up.railway.app/user/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
      })
      .then((response) => {
        setUserInfos(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="HomePage__container text-white">
      <div className="HomePage__logo-container">
        <img
          src="https://github.com/cunhaac/apus/blob/master/.github/img/logo.png?raw=true"
          alt="logo"
        />
      </div>
      <h1>Hello</h1>
      <div className="HomePage__message-container">
        <p>You are Verified</p>
        <BadgeCheck />
      </div>
      <div className="HomePage__logout">
        <button onClick={() => callLogout()}>Log out</button>
      </div>
      <div className="HomePage__userinfo-container_1">
        <p>Username:&#160; </p>
        <span>{userInfos?.username}</span>
      </div>
      <div className="HomePage__userinfo-container_2">
        <p>Email:&#160;</p>
        <span>{userInfos?.email}</span>
      </div>
    </div>
  );
};
