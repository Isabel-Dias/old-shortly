import { Router } from "express";
import { getRankings, signUp, userPage } from "../controllers/user.controller.js";
import { signIn } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/users/me", userPage);
router.get("/ranking", getRankings);

export default router;