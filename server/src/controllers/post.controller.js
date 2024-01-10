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
        throw ApiError(404, "Post content not found");
    }

    const post = await Post.create({
        owner: await User.findById(userId).select("id username nickName"),
        content,
        tags,
    });

    if (!post) {
        throw ApiError(500, "Ubable to create post");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, post, "post created successfully"));
});

export { createPost, getAllPosts };
