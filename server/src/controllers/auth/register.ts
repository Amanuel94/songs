import { type RequestHandler } from "express";
import joi from "../../utils/joi";
import jwt from "../../utils/jwt";
import crypt from "../../utils/crypt";
import Account from "../../models/Account";
import { JWT_REFRESH_EXPIRES_IN } from "../../constants";

const register: RequestHandler = async (req, res, next) => {
  try {
    const validationError = await joi.validate(
      {
        username: joi.instance.string().required().min(3).max(20),
        password: joi.instance.string().required().min(8).max(20),
      },
      req.body
    );

    if (validationError) {
      return next(validationError);
    }

    const { username, password } = req.body;

    // Verify account username as unique
    const found = await Account.findOne({ username });

    if (found) {
      return next({
        statusCode: 400,
        message: 'An account already exists with that "username"',
      });
    }

    // Encrypt password
    const hash = await crypt.hash(password);

    // Create account
    const account = new Account({ username, password: hash });
    await account.save();

    // Generate access token
    const accessToken = jwt.signToken({ uid: account._id, role: account.role });
    const refreshToken = jwt.signRefreshToken({
      uid: account._id,
      role: account.role,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * JWT_REFRESH_EXPIRES_IN, // 15 days
    });
    // Exclude password from response
    const { password: _, ...data } = account.toObject();

    res.status(201).json({
      message: "Succesfully registered",
      data,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export default register;
