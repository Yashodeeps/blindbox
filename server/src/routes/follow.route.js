import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getAccountFollowers,
    getFollwingAccounts,
    toggleFollow,
} from "../controllers/following.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/a/:accountId").get(getAccountFollowers).post(toggleFollow);

router.route("/u/:followerId").get(getFollwingAccounts);

export default router;
