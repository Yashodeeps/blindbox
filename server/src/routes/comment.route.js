import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createCommentToPost,
    createNestedComment,
    deleteComment,
    getComments,
    getCommentsByUser,
} from "../controllers/comment.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/:postId").get(getComments).post(createCommentToPost);

router.route("/nested/:parentCommentId").post(createNestedComment);

//TODO: check whether the deletion route can be mixed with the above route
router.route("/d/:commentId").delete(deleteComment);

router.route("/replies").get(getCommentsByUser);

export default router;
