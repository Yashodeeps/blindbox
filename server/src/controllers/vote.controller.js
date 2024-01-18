import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vote } from "../models/vote.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Types } from "mongoose";

const votetoPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.user;
    const { voteType } = req.body;

    const existingVote = await Vote.findOneAndDelete({
        user: userId,
        post: postId,
    });

    if (existingVote) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, { existingVote }, `${voteType} removed`)
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

const votetoComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.user;
    const voteType = req.body;

    const existingVote = await Vote.findOneAndDelete({
        user: userId,
        post: postId,
    });

    if (existingVote) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, { existingVote }, `${voteType} removed`)
            );
    }

    const newVote = await Vote.create({
        user: userId,
        comment: commentId,
        voteType,
    });

    if (!newVote) {
        throw new ApiError(500, `Server issue with ${voteType}ing`);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { newVote }, `${voteType}d successfully`));
});

// const downVote = asyncHandler(async (req, res) => {
//     const { postId, commentId } = req.params;
//     const userId = req.user;

//     const existingDownVote = await Vote.findOneAndDelete({
//         user: userId,
//         post: postId,
//         Comment: commentId,
//     });

//     const newDownVote = await Vote.create({
//         user: userId,
//         post: postId,
//         Comment: commentId,
//         voteType: "downvote",
//     });

//     if (!newDownVote || !existingDownVote) {
//         throw new ApiError(500, "Server issue with upVoting");
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 { newDownVote, existingDownVote },
//                 "Reacted successfully"
//             )
//         );
// });

const getTotalUpVotesOfPost = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const isValidObjectId = Types.ObjectId.isValid(userId);
    if (!isValidObjectId) {
        throw new ApiError(400, "invalid userId");
    }

    const totalUpVotes = await Vote.aggregate([
        {
            $match: {
                user: new Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "posts",
                localField: "post",
                foreignField: "_id",
                as: "likedposts",
                pipeline: [
                    {
                        $project: {
                            user: 1,
                            post: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                first: "$likedposts",
            },
        },
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,

            { upVotedPosts: totalUpVotes },

            "total upvotes fetched"
        )
    );
});

// const getTotalDownVotes = asyncHandler(async (req, res) => {
//     const { postId, commentId } = req.params;

//     const totalDownVotes = Vote.countDocuments({
//         post: postId,
//         Comment: commentId,
//         voteType: "downvote",
//     });

//     if (!totalDownVotes) {
//         throw new ApiError(400, "Invalid postId or commentId");
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(200, { totalDownVotes }, "total DownVotes fetched")
//         );
// });

// const getTotalUpvotedByUser = asyncHandler(async (req, res) => {
//     const { userId } = req.user;

//     const totalUpvotes = Vote.find({
//         user: userId,
//         Comment: commentId,
//         voteType: "upvote",
//     });

//     if (!totalUpvotes) {
//         throw new ApiError(400, "invalid userId");
//     }

//     return res
//         .status(200)
//         .json(new ApiResponse(200, { totalUpvotes }, "Total votes fetched"));
// });

// const getTotalDownvotedByUser = asyncHandler(async (req, res) => {
//     const { userId } = req.user;

//     const totalDownvotes = Vote.find({
//         user: userId,
//         Comment: commentId,
//         voteType: "downvote",
//     });

//     if (!totalDownvotes) {
//         throw new ApiError(400, "invalid userId");
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(200, { totalDownvotes }, "Total down votes fetched")
//         );
// });

export {
    votetoPost,
    votetoComment,
    getTotalUpVotesOfPost,
    // getTotalDownVotes,
    // getTotalUpvotedByUser,
    // getTotalDownvotedByUser,
};
