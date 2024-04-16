import React, { useContext } from "react";
import { SideBar } from "../components";
import { useDidMount } from "../hooks";
import { AuthContext } from "../context/authContext";

export const DashboardPage: React.FC = () => {
  const { authToken, getConfiguration } = useContext(AuthContext);

  useDidMount(() => {
    window.scrollTo(0, 0);
    getConfiguration(authToken);
  });

  return (
    <section className="flex gap-6">
      <SideBar />
      <div className="m-3 text-xl text-gray-900 font-semibold">
        JÁ RESPONDESTE AO NOSSO QUESTIONARIO
      </div>
    </section>
  );
};
