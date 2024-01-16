import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    // downVote,
    // getTotalDownVotes,
    // getTotalDownvotedByUser,
    // getTotalUpVotes,
    getTotalUpVotesOfPost,
    // getTotalUpvotedByUser,
    // upVote,
    votetoPost,
} from "../controllers/vote.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/:postId").post(votetoPost).get(getTotalUpVotesOfPost);

// router
//     .route("/:postOrCommentId/votes")
//     .get(getTotalUpvotedByUser)
//     .get(getTotalDownvotedByUser);

export default router;
