import React from "react";

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
    <div className="py-3 px-6 bg-gray-100 w-48 h-screen">
      <ul>
        {menuTags.map((tag) => (
          <li className="py-2 text-lg font-semibold cursor-pointer">{tag}</li>
        ))}
      </ul>
    </div>
  );
};
