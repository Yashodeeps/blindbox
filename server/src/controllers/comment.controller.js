import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId }).populate(
        "nestedComments"
    );

    if (!comments) {
        throw new ApiError(404, "No comments");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { comments }, "commented"));
});

const createComment = asyncHandler(async (req, res) => {
    const { content, owner, post } = req.body;
    const newComment = await Comment.create({
        owner,
        post,
        content,
    });

    if (!newComment) {
        throw new ApiError(500, "Server error while creating comment");
    }

    return res
        .status(200)
        .json(200, { newComment }, "Comment created successfully");
});

const createNestedComment = asyncHandler(async (req, res) => {
    const { content, owner, post, parentCommentId } = req.body;
    const parentComment = await Comment.findById(parentCommentId);

    if (!parentComment) {
        throw new ApiError(404, "Comment did not found to comment");
    }

    const newNestedComment = await Comment.create({
        owner,
        post,
        content,
        parentComment: parentCommentId,
    });

    //updating patentComment to include the nested comment

    if (!newNestedComment) {
        throw new ApiError(500, "Server error while creating comment");
    }

    await Comment.findByIdAndUpdate(parentCommentId, {
        $push: {
            nestedComments: newNestedComment._id,
        },
    });

    return res
        .status(200)
        .json(200, { newNestedComment }, "Comment created successfully");
});

const deletComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const deleatedComment = await Comment.findByIdAndDelete(commentId);

    if (!deleatedComment) {
        throw new ApiError(404, "Comment not found");
    }

    return res.status(
        200,
        { deleatedComment },
        "comment deleated successfully"
    );
});

const getCommentsByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const userComments = await Comment.find({ owner: userId })
        .populate("post", "content")
        .populate("parentComment", "content");
    if (!userComments) {
        throw new ApiError(404, "Comments not found");
    }

    return res.status(200, { userComments }, "users comments fetched");
});

export {
    getComments,
    createComment,
    createNestedComment,
    getCommentsByUser,
    deletComment,
};
