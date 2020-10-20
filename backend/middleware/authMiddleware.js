import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

import promisify from "util";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  let jwtoken = req.cookies.jwtCookie;

  // console.log("cookies", req.cookies);

  // Case #1) If there's any token as 'Bearer Token' from request header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("there Bearer token in req.headers.authorization");

    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }

    // Case #2) If there's any JWT stored in cookie
  } else if (jwtoken) {
    // decode the JWT for getting user id from it
    const decoded = jwt.verify(jwtoken, process.env.JWT_SECRET);

    // pass the user data to next middleware
    req.user = await User.findById(decoded.id).select("-password");
    return next(); // have use return here otherwise the process will hit next conditon (which is: if (!token) )
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Only admin is allowed to access this page");
  }
};

// Will get cookie for token & query a user document then save it to res.locals.user as locals variable for .pug files
const checkIfUserIsLoggedIn = asyncHandler(async (req, res, next) => {
  if (req.cookies.jwtCookie) {
    try {
      const decodedDataFromToken = await promisify(jwt.verify)(
        req.cookies.jwtCookie,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decodedDataFromToken.id);

      if (!currentUser) {
        return next();
      }

      if (currentUser.passwordChangedAfterTokenIAT(decodedDataFromToken.iat)) {
        return next();
      }

      return next();
    } catch (error) {
      //if there's any error occured, just go next middle ware function
      return next();
    }
  }

  next();
});

export { protect, admin, checkIfUserIsLoggedIn };
