import { type RequestHandler } from "express";
import jwt from "../../utils/jwt";
import Account from "../../models/Account";

const refreshToken: RequestHandler = async (req, res, next) => {
  const { refresh_tok } = req.body;
  // verify refresh token
  const auth = jwt.verifyRefreshToken(refresh_tok);
  if (!auth) {
    return next({
      statusCode: 401,
      message: "Invalid refresh token",
    });
  }
  try {
    const { uid } = typeof auth == "string" ? JSON.parse(auth) : auth;
    const account = await Account.findOne({ _id: uid }).select("-password");

    if (!account) {
      return next({
        statusCode: 400,
        message: "Bad credentials",
      });
    }

    const accountData = account.toObject();
    const accessToken = jwt.signToken({ uid: account._id, role: account.role });
    res.status(200).json({
      message: "Succesfully logged-in",
      data: accountData,
      accessToken,
    });

  } catch (error) {
    return next({
      statusCode: 400,
      message: "Bad credentials",
    });
  }
};
export default refreshToken;
