import mongoose, { Schema } from "mongoose";

const likesSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        likeType: {
            type: String,
            enum: ["like", "dislike"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Likes = mongoose.model("Likes", likesSchema);
