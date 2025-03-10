import { Router } from "express";
import { loginSession, registerSession, registerError, forgotLogic, checkSession } from "../controllers/sessions.controller.js";
import passport from "passport";

const router = Router();

router.get("/check", checkSession);
router.post("/login", loginSession);
router.post("/signup", passport.authenticate("register"), registerSession, registerError);

router.post("/forgot", forgotLogic);

export default router;