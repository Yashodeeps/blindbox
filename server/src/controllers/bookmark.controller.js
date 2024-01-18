import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Bookmark } from "../models/bookmark.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const toggleBookmark = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(400, "could not find the post");
    }

    const existingBookmark = await Bookmark.findOne({
        owner: new mongoose.Types.ObjectId(req.user._id),
        post: new mongoose.Types.ObjectId(postId),
    });

    if (!existingBookmark) {
        const newBookmark = await Bookmark.create({
            owner: new mongoose.Types.ObjectId(req.user._id),
            post: post,
        });
        if (!newBookmark) {
            throw new ApiError(500, "Server issue while bookmarking");
        }
    } else {
        await Bookmark.findByIdAndDelete(existingBookmark._id);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Bookmarked successfully"));
});

const getAllBookmarks = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const bookmarks = await Bookmark.find({ owner: userId }).populate("posts");

    if (!bookmarks) {
        throw new ApiError(404, "No bookmarks found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { bookmarks },
                "Bokmarkes fetched successfully"
            )
        );
});

export { toggleBookmark, getAllBookmarks };
