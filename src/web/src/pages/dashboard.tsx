import React from "react";
import { SideBar } from "../components";
import { useDidMount } from "../hooks";

export const DashboardPage: React.FC = () => {
  useDidMount(() => window.scrollTo(0, 0));

  return (
    <section className="flex gap-6">
      <SideBar />
      <div className="m-3 text-xl text-gray-900 font-semibold">
        JÁ RESPONDESTE AO NOSSO QUESTIONARIO
      </div>
    </section>
  );
};
