import { Router } from "express";
import login from "../services/auth/login.js";
import logMiddleware from "../middleware/logMiddleware.js";

const router = Router();

router.post("/", logMiddleware, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);

    if (!token) {
      res.status(401).json({ message: "Invalid credentials!" });
    } else {
      res.status(200).json({ message: "Successfully logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
