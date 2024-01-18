import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getAllBookmarks,
    toggleBookmark,
} from "../controllers/bookmark.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/:postId").post(toggleBookmark);

router.route("/").get(getAllBookmarks);

export default router;
