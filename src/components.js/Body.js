import React from "react";
import { SideMenu } from "./SideMenu";
import Feed from "./Feed";

const Body = () => {
  return (
    <div className="flex">
      <SideMenu />
      <Feed />
    </div>
  );
};

export default Body;
