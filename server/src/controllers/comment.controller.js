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

const createCommentToPost = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(404, "postId required");
    }
    const newComment = await Comment.create({
        owner: req.user._id,
        post: postId,
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
    const { content } = req.body;
    const { parentCommentId } = req.params;

    const parentComment = await Comment.findById(parentCommentId);

    if (!parentComment) {
        throw new ApiError(404, "Comment did not found to comment");
    }

    const newNestedComment = await Comment.create({
        owner: req.user._id,
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

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const commentToDelete = await Comment.findByIdAndDelete(commentId);

    if (!commentToDelete) {
        throw new ApiError(404, "Comment not found");
    }

    let deletedComment;

    if (commentToDelete.parentComment) {
        // The comment is a nested comment
        const parentComment = await Comment.findById(
            commentToDelete.parentComment
        );

        if (parentComment) {
            // Remove the comment ID from the parent comment's nestedComments array
            await Comment.findByIdAndUpdate(parentComment._id, {
                $pull: {
                    nestedComments: commentToDelete._id,
                },
            });
        }
    }

    // Delete the comment
    try {
        deletedComment = await Comment.findByIdAndDelete(commentId);
    } catch (error) {
        throw new ApiError(500, "Error deleting comment");
    }

    if (!deletedComment) {
        throw new ApiError(404, "Comment not found after deletion attempt");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { commentToDelete },
                "Comment deleted successfully"
            )
        );
});

const getCommentsByUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const userComments = await Comment.find({ owner: userId });

    if (!userComments) {
        throw new ApiError(404, "Comments not found");
    }

    return res.status(200, { userComments }, "users comments fetched");
});

export {
    getComments,
    createCommentToPost,
    createNestedComment,
    getCommentsByUser,
    deleteComment,
};
