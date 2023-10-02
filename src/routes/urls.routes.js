import { Router } from "express";
import { deleteUrl, getOneUrl, openUrl, postUrl } from "../controllers/urls.controller.js"
import { AuthSession } from "../middlewares/authSession.middleware.js";
const router = Router();

router.post("/urls/shorten", AuthSession, postUrl);
router.get("/urls/:id", getOneUrl);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", AuthSession, deleteUrl);

export default router;