import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

cors({
	origin: process.env.CLIENT_URL,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowHeaders: ["Content-Type", "Authorization"],
});

app.use(express.json());

// database connection
mongoose
	.connect(MONGO_URI)
	.then(() => console.log("mongodb is connected"))
	.catch((e) => console.log(e));

// middlewares
app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).json({
		success: false,
		message: "something went wrong",
	});
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
