import React, { useState } from "react";
import userIcon from "../utils/icons/user.svg";
import { useDispatch } from "react-redux";
import { addPostText, clearPostText } from "../utils/postSlice";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(addPostText(postText));
    setPostText("");
  };

  return (
    <div className="flex p-6 shadow-lg ">
      <div className="">
        <img className="bg-gray-500 p-2 rounded-full" src={userIcon} />
      </div>
      <input
        className=" px-2 mx-4 h-14 bg-gray-800 text-xl focus:outline-none w-96 border-b border-solid border-orange-500"
        type="text"
        placeholder="Post"
        value={postText}
        onChange={(e) => {
          setPostText(e.target.value);
        }}
      />
      <button
        onClick={handleOnClick}
        className="py-1 px-4 m-2 rounded-full bg-orange-500 text-white"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
