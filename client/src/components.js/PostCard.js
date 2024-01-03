import React, { useState } from "react";
import userIcon from "../utils/icons/user.svg";
import commentIcon from "../utils/icons/message-square.svg";
import { useSelector } from "react-redux";

const LikeIcon = ({ hanldeClick }) => {
  const [isFilled, setIsFilled] = useState(false);
  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isFilled ? "#FFA500" : "currentColor"}
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-thumbs-up"
      onClick={handleClick}
      className="cursor-pointer"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
  );
};

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
          <div className="flex m-4 px-10">
            <div className="mx-5">
              <LikeIcon handleLikeClick={() => console.log("Like clicked!")} />
            </div>
            <img className="mx-5" src={commentIcon} alt="comment" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
