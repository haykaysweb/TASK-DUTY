import jwt from "jsonwebtoken";

export const signToken = (id, role) => {
  const accessToken = jwt.sign(
    { id, role },
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    },
  );
  const refreshToken = jwt.sign(
    { id, role },
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    },
  );
  return { accessToken, refreshToken };
};

export const sendToken = (user) => {
  if (!user) return;
  const tokens = signToken(user._id, user.role); //_id comes from mongodb
  //create a cookie to store the access token
  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true, //accessible only by web server
    secure: isProduction, //https only in production
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refresh token expiry
    path: "/", //cookie is accessible on the specified api endpoint
    sameSite: isProduction ? "none" : "lax", //is required when the ccokie is used on different domains - server and client runs on a different host/port. we want to adjust the cross-site request policy ensuring the secure transfer of the cookie to a diff domain when in production node (HTTPS), setting lax enables the cookie to work.
  };
  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    cookieOptions,
  };
};
