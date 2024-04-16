import React, { useContext } from "react";
import { ProgressCards, SideBar } from "../components";
import { useDidMount } from "../hooks";
import { AuthContext } from "../context/authContext";

export const DashboardPage: React.FC = () => {
  const { authToken, getConfiguration } = useContext(AuthContext);

  useDidMount(() => {
    window.scrollTo(0, 0);
    getConfiguration(authToken);
  });

  return (
    <section className="flex">
      <SideBar />
      <div className="bg-gray-100 dark:bg-gray-800 w-screen">
        <ProgressCards
          phaseLevel="5"
          phaseReduction="80%"
          savedCigarettes="25"
        />
      </div>
    </section>
  );
};
