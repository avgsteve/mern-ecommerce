import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

const setTokenAsCookie = (res, req, token) => {
  return res.cookie(
    // ref: http://expressjs.com/en/5x/api.html#res.cookie
    "jwtCookie", // cookie name
    token, // cookie payload
    {
      // options
      expires: new Date(
        // Option: expires . Set expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 24 * 10 // default is one second and turn it to 10 days
      ),

      httpOnly: true, // Flags the cookie to be accessible only by the web server to preven cross site scripting attack
      sameSite: true, // equals to 'strict'

      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    }
  );
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const jwToken = generateToken(user._id);
    setTokenAsCookie(res, req, jwToken);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: jwToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { login };
