import mongoose, { Schema } from "mongoose";

const bookmarkSchema = new Schema(
    {
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
