import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { BadgeCheck } from "lucide-react";
import apusLogo from "../assets/apusLogo.png";

interface userinfoInterface {
  id: number;
  username: string;
  email: string;
}

export const DashboardPage: React.FC = () => {
  const { authToken, callLogout } = useContext(AuthContext);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-full h-screen">
      <div>
        <img src={apusLogo} alt="logo" />
      </div>
      <h1>Hello</h1>
      <div>
        <p>You are Verified</p>
        <BadgeCheck />
      </div>
      <div>
        <button onClick={() => callLogout()}>Log out</button>
      </div>
      <div>
        <p>Username:&#160; </p>
        <span>{userInfos?.username}</span>
      </div>
      <div>
        <p>Email:&#160;</p>
        <span>{userInfos?.email}</span>
      </div>
    </div>
  );
};
