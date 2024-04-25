import React, { useContext } from "react";
import { Power, CircleUser, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { sideBarMenu } from "../constants/sidebar";
import { Link } from "react-router-dom";
import apusLogo from "../assets/apusLogo.png";
import { AuthContext, userConfigurationResponse } from "../context/authContext";

export function SideBar() {
  const { callLogout } = useContext(AuthContext);

  const userConfig: userConfigurationResponse = localStorage.getItem(
    "userConfig"
  )
    ? JSON.parse(localStorage.getItem("userConfig") || "")
    : undefined;

  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-gray-900 h-[calc(100dvh)] relative flex flex-col overflow-hidden ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-6 flex gap-2">
        <img src={apusLogo} alt="logo" height={24} width={24} />
        <strong
          style={{
            transitionDelay: `300ms`,
          }}
          className={`flex items-center text-white whitespace-pre duration-500 ${
            !open && "opacity-0 translate-x-28 overflow-hidden "
          }`}
        >
          Apus
        </strong>
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {sideBarMenu?.map((menu, i) => (
          <span key={i}>
            {menu?.disable ? (
              <button
                key={i}
                title="Coming Soon"
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium py-2`}
                disabled
              >
                <div>
                  {React.createElement(menu?.icon, {
                    size: "20",
                    color: "#94A3B8",
                  })}
                </div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`text-slate-400 whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
              </button>
            ) : (
              <Link
                to={menu?.link}
                key={i}
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium pt-2 pb-2 rounded-md hover:bg-gray-800`}
              >
                <div>
                  {React.createElement(menu?.icon, {
                    size: "20",
                    color: "#FFF",
                  })}
                </div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`text-white whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
              </Link>
            )}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <div className="w-full pb-4 flex justify-end">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <ChevronLeft color={"#FFF"} size={24} />
            ) : (
              <ChevronRight color={"#FFF"} size={24} />
            )}
          </button>
        </div>
        <div className="border-t border-white flex py-4">
          <div className={"w-full flex items-center"}>
            <CircleUser
              className={`text-white whitespace-pre duration-500 ${
                open ? "mr-2" : "opacity-0 translate-x-28 overflow-hidden"
              }`}
              color={"#FFF"}
              style={{
                transitionDelay: `300ms`,
              }}
              size={22}
            />
            <h4
              style={{
                transitionDelay: `300ms`,
              }}
              className={`text-white whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {userConfig?.user.username}
            </h4>

            <button className={"ml-auto"} onClick={() => callLogout()}>
              <Power size={20} color="#9333EA" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
