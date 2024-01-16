import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        voteType: {
            type: String,
            enum: ["upvote", "downvote"],
        },
    },
    {
        timestamps: true,
    }
);

voteSchema.set("toJSON", {
    transform: function (doc, ret) {
        // Remove circular references
        delete ret._id;
        delete ret.__v;
    },
});

export const Vote = mongoose.model("Vote", voteSchema);
