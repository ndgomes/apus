import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

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
  const { callLogout } = useContext(AuthContext);

  return (
    <>
      <strong className="text-red">JÁ RESPONDESTE AO NOSSO QUESTIONARIO</strong>
      <button onClick={() => callLogout()}>Log out</button>
    </>
  );
};
