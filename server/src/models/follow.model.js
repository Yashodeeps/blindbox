import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
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

export const Follow = mongoose.model("Follow", followSchema);
