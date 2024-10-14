import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
	const { username, email, password, role } = req.body;

	const existingUser = await User.findOne({ $or: [{ username }, { email }] });
	const saltRounds = 10;

	if (existingUser) {
		return res.status(400).json({
			success: false,
			message: "User name or email already exists",
		});
	}

	const hashPassword = await bcrypt.hash(password, saltRounds);

	const newUser = new User({ username, email, password: hashPassword, role });
	await newUser.save();

	return res.status(201).json({
		success: true,
		message: "User registered successfully!",
	});
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	const checkUser = await User.findOne({ email });

	if (!checkUser || (await bcrypt.compare(password, checkUser.password))) {
		return res.status(401).json({
			success: false,
			message: "Invalid credentials",
		});
	}

	const token = jwt.sign(
		{
			_id: checkUser._id,
			username: checkUser.username,
			email: checkUser.email,
			role: checkUser.role,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "120m" }
	);

	res.status(200).json({
		success: true,
		message: "Logged in successfully!",
		data: {
			token,
			user: {
				_id: checkUser._id,
				username: checkUser.username,
				email: checkUser.email,
				role: checkUser.role,
			},
		},
	});
};
