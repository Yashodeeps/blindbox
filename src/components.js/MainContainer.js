import React from "react";
import Header from "./Header";
import PostCard from "./PostCard";

const MainContainer = () => {
  return (
    <div className="h-screen bg-gray-800 text-white top-0 left-0  overflow-y-auto ">
      <Header />
      <PostCard />
    </div>
  );
};

export default MainContainer;
