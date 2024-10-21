// server/routes/dashboard.js
import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json({ msg: "Welcome to the dashboard!", role: req.user.role });
});

router.get("/admin", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }
  res.json({ msg: "Welcome to the admin dashboard!" });
});

export default router;