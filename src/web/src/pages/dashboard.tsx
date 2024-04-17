import React, { useContext } from "react";
import { ProgressCards, SideBar, SmokeButton } from "../components";
import { useDidMount } from "../hooks";
import { AuthContext } from "../context/authContext";

export const DashboardPage: React.FC = () => {
  const { authToken, getConfiguration } = useContext(AuthContext);

  useDidMount(() => {
    window.scrollTo(0, 0);
    getConfiguration(authToken);
  });

  const handleOnClickSmoke = () => {
    console.log("oila");
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="bg-gray-100 dark:bg-gray-800 w-screen">
        <div className="mt-3">
          <ProgressCards
            phaseLevel="5"
            phaseCompleted="80%"
            savedCigarettes="25"
            savedMoney="1 500,56 €"
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <SmokeButton
            onClickSmoke={handleOnClickSmoke}
            timeToNextCigarette="00:51:56:28"
          />

          <div className="border-4 border-purple-500 rounded-lg h-[28rem] md:h-[38rem] lg:h-[42rem] p-4 md:w-2/3 my-4 mx-4 md:mr-4 lg:mr-8">
            <p>History</p>
          </div>
        </div>
      </div>
    </div>
  );
};
