import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: {
            type: Schema.Types.ObjectId,
            ref: "Likes",
        },
        dislikes: {
            type: Schema.Types.ObjectId,
            ref: "Likes",
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        tags: {
            type: String,
        },
    },
    { timestamps: true }
);

postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model("Post", postSchema);
