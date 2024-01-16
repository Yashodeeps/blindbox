import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createComment,
    createNestedComment,
    deletComment,
    getComments,
    getCommentsByUser,
} from "../controllers/comment.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/:postId").get(getComments).post(createComment);

router.route("/:postId/nested").post(createNestedComment);

router.route("/c/:commentId").delete(deletComment);

router.route("/u/userId").get(getCommentsByUser);

export default router;
