import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", authenticate, (req, res) => {
	const user = req.user;

	res.status(200).json({
		success: true,
		message: "User authenticated!",
		data: {
			user,
		},
	});
});

export default router;
