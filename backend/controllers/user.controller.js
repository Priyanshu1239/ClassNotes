import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// generate tokens helper
const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);

        if (!user) {
            throw new apiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        await User.findByIdAndUpdate(userID, { refreshToken }, { new: true });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error.message);
        throw new apiError(500, "Token generation failed");
    }
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new apiError(400, "Please fill in all fields");
    }

    const user = await User.create({ username, email, password });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new apiError(404, "User not found after creation");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new apiResponse(
                201,
                { user: createdUser, accessToken, refreshToken },
                "User created successfully"
            )
        );
});

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new apiError(400, "Please fill in all fields");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new apiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new apiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

// LOGOUT
const loggedOutUser = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(400).json(new apiResponse(400, {}, "No user found in request"));
    }

    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: "" } },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new apiResponse(200, {}, "User logged out"));
});

// CONTACT
const contactUser = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json(new apiResponse(400, {}, "Please fill all fields"));
    }

    const contact = await Contact.create({ name, email, subject, message });

    return res.status(201).json(
        new apiResponse(201, { contact }, "Contact info submitted")
    );
});

// REFRESH TOKEN
const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new apiError(401, "Refresh token not found");
    }

    const tokenSecret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
    if (!tokenSecret) {
        throw new apiError(500, "Refresh token secret not configured");
    }

    try {
        const decoded = jwt.verify(refreshToken, tokenSecret);
        const user = await User.findById(decoded._id);

        if (!user) {
            throw new apiError(404, "User not found");
        }

        const { accessToken, refreshToken: newRefreshToken } =
            await generateAccessAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", newRefreshToken, cookieOptions)
            .json(new apiResponse(200, { accessToken }, "Access token refreshed"));
    } catch (error) {
        throw new apiError(401, "Invalid or expired refresh token");
    }
});

export {
    registerUser,
    loginUser,
    loggedOutUser,
    contactUser,
    refreshAccessToken
};
