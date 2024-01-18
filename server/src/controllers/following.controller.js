import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { Follow } from "../models/follow.model.js";
import mongoose from "mongoose";

const toggleFollow = asyncHandler(async (req, res) => {
    const { accountId } = req.params;

    if (!accountId) {
        throw new ApiError(404, "accountId required");
    }

    const follwoing = await Follow.findOne({
        $and: [
            {
                follower: new mongoose.Types.ObjectId(req.user._id),
            },
            {
                account: new mongoose.Types.ObjectId(accountId),
            },
        ],
    });

    if (!follwoing) {
        const follow = await Follow.create({
            follower: new mongoose.Types.ObjectId(req.user._id),
            account: new mongoose.Types.ObjectId(accountId),
        });

        if (!follow) {
            throw new ApiError(500, "Server issue with toggeling following");
        }
    } else {
        await Follow.findByIdAndDelete(follwoing._id);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "follow/unfollow toggeled successfully")
        );
});

const getAccountFollowers = asyncHandler(async (req, res) => {
    const { accountId } = req.params;

    if (!accountId) {
        throw new ApiError(404, "accountId required");
    }

    const followers = await Follow.aggregate([
        {
            $match: {
                account: new mongoose.Types.ObjectId(accountId),
            },
        },
        {
            $project: {
                username: 1,
                nickName: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, followers, "get subscribers successfully"));
});

const getFollwingAccounts = asyncHandler(async (req, res) => {
    const { followerId } = req.params;

    if (!followerId) {
        throw new ApiError(404, "followerId required");
    }

    const following = await Follow.aggregate([
        {
            $match: {
                follower: new mongoose.Types.ObjectId(followerId),
            },
        },
        {
            $project: {
                username: 1,
                nickName: 1,
            },
        },
    ]);
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                following,
                "accounts following fetched successfully"
            )
        );
});

export { toggleFollow, getAccountFollowers, getFollwingAccounts };
