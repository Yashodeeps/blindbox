import React from "react";
import userIcon from "../utils/icons/user.svg";
import { useSelector } from "react-redux";

const PostCard = () => {
  const postText = useSelector((store) => store.post.postText);

  return (
    <div>
      {postText.map((post) => (
        <div className="border border-solid border-gray-500">
          <div className="flex m-4 ">
            <div className="">
              <img className="bg-gray-500 p-2 rounded-full" src={userIcon} />
            </div>
            <div className="px-5">
              <h1 className="text-lg">Yashodeep</h1>
              <p>{post}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
