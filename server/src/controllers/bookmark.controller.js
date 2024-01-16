import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Bookmark } from "../models/bookmark.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addToBookmark = asyncHandler(async (req, res) => {
    const { postId, ownerId } = req.body;

    const owner = await User.findById(ownerId);
    const post = await Post.findById(postId);

    if (!owner || !post) {
        throw new ApiError(400, "could not find owner and post");
    }

    const existingBookmark = await Bookmark.findOne({
        owner: ownerId,
        post: postId,
    });

    if (!existingBookmark) {
        throw new ApiError(400, "Already bookmarked");
    }

    const newBookmark = await Bookmark.create({
        owner: ownerId,
        post: postId,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { newBookmark }, "Bookmarked successfully"));
});

const getAllBookmarks = asyncHandler(async (req, res) => {
    const { ownerId } = req.params;

    //TODO: can we do it by taking user id from auth middleware

    const bookmarks = await Bookmark.find({ owner: ownerId }).populate("posts");

    if (!bookmarks) {
        throw new ApiError(404, "No bookmarks found");
    }
});

const removeBookmark = asyncHandler(async (req, res) => {
    const { ownerId, postId } = req.body;

    try {
        const bookmark = await Bookmark.findOneAndDelete({
            owner: ownerId,
            post: postId,
        });
        console.log(bookmark);
        return res
            .status(200)
            .json(new ApiResponse(200, bookmark, "Bookmark removed"));
    } catch (error) {
        throw new ApiError(404, "Bookmark not found");
        next(error);
    }
});

export { addToBookmark, getAllBookmarks, removeBookmark };
