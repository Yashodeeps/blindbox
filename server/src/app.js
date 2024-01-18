import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));

app.use(
    express.urlencoded({ extended: true, limit: "16kb" })
); /*express.urlencoded() this will also work, but for more in production */
app.use(express.static("public")); //for storing any files and folders
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routs.js";
import postRouter from "./routes/post.routes.js";
import bookmarkRouter from "./routes/bookmark.routes.js";
import commentRouter from "./routes/comment.route.js";
import voteRouter from "./routes/vote.route.js";
import followRouter from "./routes/follow.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);
app.use("/api/v1/votes", voteRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/follow", followRouter);

export { app };
