import React from "react";
import { SideBar } from "../components";
import { useDidMount } from "../hooks";

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
  useDidMount(() => window.scrollTo(0, 0));

  return (
    <section className="flex gap-6">
      <SideBar />
      <div className="m-3 text-xl text-gray-900 font-semibold">
        <strong className="text-red">
          JÁ RESPONDESTE AO NOSSO QUESTIONARIO
        </strong>
      </div>
    </section>
  );
};
