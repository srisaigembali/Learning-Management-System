import express from "express";
import {
	capturePaymentAndFinalizeOrder,
	createOrder,
} from "../../controllers/student-controller/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePaymentAndFinalizeOrder);

export default router;
