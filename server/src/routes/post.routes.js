import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createPost,
    deletPost,
    getAllPosts,
    togglePublishStatus,
} from "../controllers/post.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createPost);
router.route("/").get(getAllPosts);

router.route("/p/:postId").delete(deletPost);

router.route("/toggle/publish/:postId").patch(togglePublishStatus);

export default router;
