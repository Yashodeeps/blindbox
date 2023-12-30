import React from "react";

export const title = (
  <h1 className="text-3xl font-bold">
    <span className="text-white">Blind</span>
    <span className="text-orange-700">Box</span>
  </h1>
);

const Header = () => {
  return (
    <div className=" py-6 px-3 flex border-b border-solid border-gray-500">
      <div className="mx-2 ">
        <input
          className="py-2 px-10 w-96 bg-gray-700 rounded-full   "
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
