import React from "react";
import userIcon from "../utils/icons/user.svg";

const PostCard = () => {
  return (
    <div className="border border-solid border-gray-500">
      <div className="flex m-4 ">
        <div className="">
          <img className="bg-gray-500 p-2 rounded-full" src={userIcon} />
        </div>
        <div className="px-5">
          <h1 className="text-lg">Yashodeep</h1>
          <p>This is the demo blind.....</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
