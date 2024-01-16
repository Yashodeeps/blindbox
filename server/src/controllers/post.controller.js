import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

import { Schema } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllPosts = asyncHandler(async (req, res) => {
    //TODO: add limitations <    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query >

    const posts = await Post.find().sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, posts, "posts fetched successfully"));
});

const createPost = asyncHandler(async (req, res) => {
    const { content, tags } = req.body;
    const userId = req.user._id;

    if (!content) {
        throw new ApiError(404, "Post content not found");
    }

    const post = await Post.create({
        owner: await User.findById(userId).select("id username nickName"),
        content,
        tags,
    });

    if (!post) {
        throw new ApiError(500, "Ubable to create post");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, post, "post created successfully"));
});

const deletPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, "postId not found");
    }

    await Post.findByIdAndDelete(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Post deleated successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(400, "the post doesn't exist");
    }

    post.published = !post.published;

    const postStatus = await post.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, postStatus, "Successfully changed post states")
        );
});

export { createPost, getAllPosts, deletPost, togglePublishStatus };
