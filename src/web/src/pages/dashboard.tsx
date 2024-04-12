import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useDidMount } from "../hooks";
import { QuizPage } from "./quiz";

export interface userConfigInterface {
  quiz: {
    cigarettes_per_day: number | null;
    price_per_package: number | null;
    cigarettes_per_package: number | null;
  };
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export const DashboardPage: React.FC = () => {
  const { authToken, callLogout } = useContext(AuthContext);

  const [userConfig, setUserConfig] = useState<userConfigInterface | undefined>(
    undefined
  );
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

  useDidMount(() => {
    axios
      .get("https://api.apu-s.space/configuration", {
        headers: {
          token: authToken,
        },
      })
      .then((response) => {
        setUserConfig(response.data.config);
        if (Object.values(response.data.config.quiz).every((x) => x === null))
          return setIsFirstTime(true);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      {isFirstTime && <QuizPage isFirstTime userConfig={userConfig} />}
      <strong className="text-red">JÁ RESPONDESTE AO NOSSO QUESTIONARIO</strong>
      {/* <button onClick={() => callLogout()}>Log out</button> */}
    </>
  );
};
