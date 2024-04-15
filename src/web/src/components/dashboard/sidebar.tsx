import React, { useContext } from "react";
import { Power, CircleUser, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { sideBarMenu } from "../../constants/dashboard";
import { Link } from "react-router-dom";
import apusLogo from "../../assets/apusLogo.png";
import { AuthContext } from "../../context/authContext";
import { Moon, Sun } from "lucide-react";

export function SideBar() {
  const [open, setOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const { callLogout, userConfig } = useContext(AuthContext);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-900 h-[calc(100dvh)] flex flex-col ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-6 flex gap-2">
        <img src={apusLogo} alt="logo" height={24} width={24} />
        <strong
          style={{
            transitionDelay: `300ms`,
          }}
          className={`flex items-center text-black dark:text-white whitespace-pre duration-500 ${
            !open && "opacity-0 translate-x-28 overflow-hidden "
          }`}
        >
          Apus
        </strong>
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {sideBarMenu?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-sm gap-3.5 font-medium pt-2 pb-2 hover:bg-gray-800 rounded-md`}
          >
            <div>
              {React.createElement(menu?.icon, {
                size: "20",
                color: dark ? "#000" : "#FFF",
              })}
            </div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`text-black dark:text-white whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="mt-auto">
        <div className="w-full flex items-center pb-4">
          <button
            style={{
              transitionDelay: `300ms`,
            }}
            className={`mr-auto whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
            onClick={() => darkModeHandler()}
          >
            {!dark && <Sun size={18} color="white" fill="white" />}
            {dark && <Moon size={20} color="black" fill="black" />}
          </button>
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <ChevronLeft color={dark ? "#000" : "#FFF"} size={24} />
            ) : (
              <ChevronRight color={dark ? "#000" : "#FFF"} size={24} />
            )}
          </button>
        </div>
        <div className="border-t border-black dark:border-white flex py-4">
          <div className={"w-full flex items-center"}>
            <CircleUser
              style={{
                transitionDelay: `300ms`,
              }}
              className={`text-black dark:text-white whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }
              ${open && "mr-2"}`}
              color={dark ? "#000" : "#FFF"}
              size={22}
            />
            <h4
              style={{
                transitionDelay: `300ms`,
              }}
              className={`text-black dark:text-white whitespace-pre duration-500 ${
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
