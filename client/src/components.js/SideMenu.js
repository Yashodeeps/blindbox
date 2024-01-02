import React from "react";
import { title } from "./Header";

const menuTags = [
  "Home",
  "Confessions",
  "Bitching",
  "Problems",
  "Experiences",
  "Reviews",
];
export const SideMenu = () => {
  return (
    <>
      <div className="h-screen w-1/4 bg-gray-800 fixed text-white top-0 left-0 p-4 overflow-y-auto px-20 border-r border-solid border-gray-500">
        {" "}
        <div className="py-2">{title}</div>
        <div className="flex flex-col justify-end ">
          <ul className=" ">
            {menuTags.map((tag) => (
              <li className="py-3 text-xl font-semibold cursor-pointer hover:bg-gray-700 transition duration-300">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
