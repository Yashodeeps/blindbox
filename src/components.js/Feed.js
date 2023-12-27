import React from "react";
import { postDetail } from "../utils/constants";

const posts = postDetail;

const Post = ({ data }) => (
  <div>
    <h1>{data.name}</h1>
    <p>{data.text}</p>
  </div>
);

const PostList = () => {
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post.name}>
            <Post data={post} />
          </div>
        ))}
    </div>
  );
};

const Feed = () => {
  return (
    <div>
      <PostList />
    </div>
  );
};

export default Feed;
