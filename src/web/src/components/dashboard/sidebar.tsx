import React, { useContext } from "react";
import {
  SquareChevronRight,
  SquareChevronLeft,
  LogOut,
  CircleUser,
} from "lucide-react";
import { useState } from "react";
import { sideBarMenu } from "../../constants/dashboard";
import { Link } from "react-router-dom";
import apusLogo from "../../assets/apusLogo.png";
import { AuthContext } from "../../context/authContext";

export function SideBar() {
  const [open, setOpen] = useState(true);
  const { callLogout, userConfig } = useContext(AuthContext);

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-900 min-h-screen flex flex-col ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex gap-2">
        <img src={apusLogo} alt="logo" height={24} width={24} />
        <strong
          style={{
            transitionDelay: `300ms`,
          }}
          className={`flex items-center whitespace-pre duration-500 ${
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
              })}
            </div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={` whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="mt-auto">
        <div className="flex justify-end pb-4">
          {open ? (
            <SquareChevronLeft
              size={24}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <SquareChevronRight
              size={24}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <div className="border-t flex py-4">
          <CircleUser size={20} />
          {open && (
            <div className={"w-full flex justify-between items-center"}>
              <h4 className="font-semibold pl-3">
                {userConfig?.user.username}
              </h4>
              <LogOut size={20} onClick={() => callLogout()} color="#9333EA" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
