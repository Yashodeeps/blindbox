import React from "react";
import menu from "../utils/icons/menu.svg";

const title = (
  <h1 className="text-3xl font-bold">
    <span className="text-slate-700">Blind</span>
    <span className="text-orange-800">Box</span>
  </h1>
);

const Header = () => {
  return (
    <div className="my-2 py-2 px-3 flex justify-between shadow-sm ">
      <div className="flex ">
        <img
          className="py-2 px-3 mx-3   rounded-full hover:bg-gray-100"
          src={menu}
          alt="icon"
        />
        <div>{title}</div>
      </div>

      <div className="mx-2">
        <input
          className="py-2 px-4 w-96   bg-gray-100 rounded-full   "
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex">
        <h1 className="m-2 text-lg font-medium px-3">Home</h1>

        <h1 className="m-2 text-lg font-medium px-3">Profile</h1>
      </div>
    </div>
  );
};

export default Header;
