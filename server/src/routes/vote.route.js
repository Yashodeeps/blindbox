import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getTotalVotesOfComment,
    getTotalVotesOfPost,
    toggleCommentVotes,
    togglePostVotes,
    userVotes,
} from "../controllers/vote.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/:postId").post(togglePostVotes).get(getTotalVotesOfPost);
router
    .route("/c/:commentId")
    .post(toggleCommentVotes)
    .get(getTotalVotesOfComment);

router.route("/").get(userVotes);
export default router;
