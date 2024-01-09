import mongoose, { Schema } from "mongoose";

const followingSchema = new Schema(
    {
        follower: {
            //one who is following
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        account: {
            //to whom follower is following
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Following = new mongoose.model("Following", followingSchema);
