import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createPost);
router.route("/").get(getAllPosts);

export default router;
