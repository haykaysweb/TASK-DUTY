import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import responseHandler from "../utils/responseHandler.js";
import { sendToken, signToken } from "../utils/token.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // check if email or username already exists
    const [emailExists, usernameExists] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
    ]);

    if (emailExists)
      return next(responseHandler.errorResponse("Email already exists", 400));

    if (usernameExists)
      return next(
        responseHandler.errorResponse("Username already exists", 400),
      );

    // if user is new proceed to create a new user
    // handle verification token generation
    const verifyToken = crypto.randomBytes(16).toString("hex");
    const verifyTokenExpires = new Date(Date.now() + 3600000);

    // handle password encryption
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // save user to database
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      verifyToken,
      verifyTokenExpires,
    });

    // generate access and refresh token
    const { accessToken, refreshToken, cookieOptions } = sendToken(newUser);

    // send cookie in response
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // send response to client
    return responseHandler.successResponse(
      res,
      accessToken,
      "Registration successfully, log in to proceed",
      201,
    );
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // find user in database via username
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(responseHandler.notFoundResponse("Account not found"));
    }

    // handle password decryption
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(
        responseHandler.unauthorizedResponse("Incorrect credentials"),
      );
    }

    // generate access and refresh token
    const { accessToken, refreshToken, cookieOptions } = sendToken(user);

    // send cookie in response
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // return json response
    return responseHandler.successResponse(
      res,
      accessToken,
      "Login successful",
      200,
    );
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    return responseHandler.successResponse(res, null, "Logout successful", 200);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).lean();
    return responseHandler.successResponse(res, user, "user found", 200);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshedToken = req.cookies.refreshToken;

    if (!refreshedToken) {
      return next(responseHandler.errorResponse("Refresh token is required"));
    }

    const verifyToken = jwt.verify(
      refreshedToken,
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    );

    if (!verifyToken) {
      throw new Error("Invalid refresh token");
    }

    // find user in db
    const user = await User.findById(verifyToken.id).lean();

    if (!user) {
      return next(responseHandler.notFoundResponse("User not found"));
    }

    const getNewToken = signToken(user._id);

    if (!getNewToken) {
      throw new Error("Failed to create a new token");
    }

    // destructured accessToken and cookieOptions from the new token
    const { accessToken } = getNewToken;

    return responseHandler.successResponse(
      res,
      accessToken,
      "accesstoken refreshed",
      200,
    );
  } catch (error) {
    next(error);
  }
};
