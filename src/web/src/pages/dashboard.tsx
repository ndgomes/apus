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
  const { getConfiguration, firstTime, userConfig, callLogout } =
    useContext(AuthContext);

  useDidMount(() => {
    getConfiguration();
  });

  return (
    <>
      {firstTime && (
        <QuizPage isFirstTime={firstTime} userConfig={userConfig} />
      )}
      <strong className="text-red">JÁ RESPONDESTE AO NOSSO QUESTIONARIO</strong>
      <button onClick={() => callLogout()}>Log out</button>
    </>
  );
};
