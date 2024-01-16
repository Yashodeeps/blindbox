import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addToBookmark,
    getAllBookmarks,
    removeBookmark,
} from "../controllers/bookmark.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(addToBookmark).delete(removeBookmark);

router.route("/b/:ownerId").get(getAllBookmarks);

export default router;
