import { type RequestHandler } from "express";
import joi from "../../utils/joi";
import jwt from "../../utils/jwt";
import crypt from "../../utils/crypt";
import Account from "../../models/Account";
import { JWT_REFRESH_EXPIRES_IN } from "../../constants";

const login: RequestHandler = async (req, res, next) => {
  try {
    const validationError = await joi.validate(
      {
        username: joi.instance.string().required(),
        password: joi.instance.string().required(),
      },
      req.body
    );

    if (validationError) {
      return next(validationError);
    }

    const { username, password } = req.body;

    // Get account from DB, and verify existance
    const account = await Account.findOne({ username });

    if (!account) {
      return next({
        statusCode: 400,
        message: "Bad credentials",
      });
    }

    // Verify password hash
    const passOk = await crypt.validate(password, account.password);

    if (!passOk) {
      return next({
        statusCode: 400,
        message: "Bad credentials",
      });
    }

    // Generate access token
    const accessToken = jwt.signToken({ uid: account._id, role: account.role });
    const refreshToken = jwt.signRefreshToken({
      uid: account._id,
      role: account.role,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * JWT_REFRESH_EXPIRES_IN, // 15 days
    });

    // Remove password from response data
    const { password: _, ...accountData } = account.toObject();

    res.status(200).json({
      message: "Succesfully logged-in",
      data: accountData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export default login;
