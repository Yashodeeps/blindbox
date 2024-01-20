import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vote } from "../models/vote.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { Types } from "mongoose";

const togglePostVotes = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const { voteType } = req.body;

    let existingVote;

    if (voteType === "downvote") {
        // If the new vote is a downvote, remove any existing upvote
        existingVote = await Vote.findOneAndDelete({
            user: userId,
            post: postId,
            voteType: "upvote",
        });
    }
    if (voteType == "downvote") {
        // If the new vote is an upvote, remove any existing downvote
        existingVote = await Vote.findOneAndDelete({
            user: userId,
            post: postId,
            voteType: "downvote",
        });
    }

    if (existingVote) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { existingVote },
                    `${existingVote} removed`
                )
            );
    }

    const newVote = await Vote.create({
        user: userId,
        post: postId,
        voteType: voteType,
    });

    if (!newVote) {
        throw new ApiError(500, `Server issue with ${voteType}ing`);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { newVote }, `${voteType}d successfully`));
});

const toggleCommentVotes = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    const { voteType } = req.body;

    let existingVote;

    if (voteType === "downvote") {
        // If the new vote is a downvote, remove any existing upvote
        existingVote = await Vote.findOneAndDelete({
            user: userId,
            comment: commentId,
            voteType: "upvote",
        });
    }
    if (voteType == "downvote") {
        // If the new vote is an upvote, remove any existing downvote
        existingVote = await Vote.findOneAndDelete({
            user: userId,
            comment: commentId,
            voteType: "downvote",
        });
    }

    if (existingVote) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { existingVote },
                    `${existingVote} removed`
                )
            );
    }

    const newVote = await Vote.create({
        user: userId,
        comment: commentId,
        voteType: voteType,
    });

    if (!newVote) {
        throw new ApiError(500, `Server issue with ${voteType}ing`);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { newVote }, `${voteType}d successfully`));
});

const getTotalVotesOfPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const totalupvotes = await Vote.find({
        post: new mongoose.Types.ObjectId(postId),
        voteType: "upvote",
    });

    if (!totalupvotes) {
        throw new ApiError(400, "No upvotes");
    }

    const totaldownvotes = await Vote.find({
        post: new mongoose.Types.ObjectId(postId),
        voteType: "downvote",
    });

    if (!totalupvotes) {
        throw new ApiError(400, "No downvotess");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            {
                totalUpvotes: totalupvotes,
                totalUpVotesCount: totalupvotes.length,
                totaldownvotes: totaldownvotes,
                totaldownvotesCount: totaldownvotes.length,
            },
            "votes fetched successfully"
        )
    );
});

const getTotalVotesOfComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const totalupvotes = await Vote.find({
        comment: new mongoose.Types.ObjectId(commentId),
        voteType: "upvote",
    });

    if (!totalupvotes) {
        throw new ApiError(400, "No upvotes");
    }

    const totaldownvotes = await Vote.find({
        comment: new mongoose.Types.ObjectId(commentId),
        voteType: "downvote",
    });

    if (!totalupvotes) {
        throw new ApiError(400, "No downvotess");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            {
                totalUpvotes: totalupvotes,
                totalUpVotesCount: totalupvotes.length,
                totaldownvotes: totaldownvotes,
                totaldownvotesCount: totaldownvotes.length,
            },
            "votes fetched successfully"
        )
    );
});

const userVotes = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const totalUpVotes = await Vote.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                voteType: "upvote",
            },
        },
        {
            $project: {
                user: 1,
                post: 1,
                comment: 1,
            },
        },
    ]);

    const totalDownVotes = await Vote.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                voteType: "downvote",
            },
        },
        {
            $project: {
                user: 1,
                post: 1,
                comment: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { totalUpVotes: totalUpVotes, totalDownVotes: totalDownVotes },
                "Total votes fetched"
            )
        );
});

export {
    togglePostVotes,
    getTotalVotesOfPost,
    toggleCommentVotes,
    getTotalVotesOfComment,
    userVotes,
};
