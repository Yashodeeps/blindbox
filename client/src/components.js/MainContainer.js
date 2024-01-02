import React from "react";
import Header from "./Header";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";

const MainContainer = () => {
  return (
    <div className="h-screen bg-gray-800 text-white top-0 left-0  overflow-y-auto ">
      <Header />
      <CreatePost />

      <PostCard />
    </div>
  );
};

export default MainContainer;
