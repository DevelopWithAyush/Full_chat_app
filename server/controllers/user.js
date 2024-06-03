// Import necessary modules
import bcrypt, { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/error.js";  // Ensure this path is correct

// Register user function
const register = TryCatch(async (req, res, next) => {
    const { name, userEmail, password, avatar } = req.body;

    // Check if user already exists
    let user = await User.findOne({ userEmail });
    if (user) {
        return next(new ErrorHandler("This email already exists", 404));
    }

    // Create new user
    user = new User({
        name,
        userEmail,
        password,
        avatar,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Send token to client
    sendToken(res, user, 201, "User created");
});

// Login user function
const login = TryCatch(async (req, res, next) => {
    const { userEmail, password } = req.body;

    // Find user by email and select password
    const user = await User.findOne({ userEmail }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email", 404));
    }

    // Compare password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid password", 404));
    }

    // Send token to client
    sendToken(res, user, 200, `Welcome back, ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res,next) => {
    const user = await User.findById(req.user);

    if (!user) {
        return next(new ErrorHandler("user not found",404))
    }

    res.status(200).json({
        success: true,
        data: user
    });

})

// Export functions
export { login, register, getMyProfile };
