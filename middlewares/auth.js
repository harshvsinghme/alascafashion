const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.fetchCart = (cart, res) => {
  try {
    if (!cart) throw null;
    cart = JSON.parse(cart);
    // res.cookie("cart", JSON.stringify(cart));
    return cart;
  } catch (err) {
    res.cookie("cart", JSON.stringify([]));
    return undefined;
  }
};
exports.isValidToken = async (token, res) => {
  try {
    if (!token) throw { message: "Please Log In to access this Resource" };
    // console.log(token)
    return await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async function (err, decoded) {
        // console.log(decoded)
        try {
          if (err) {
            if (err.name == "TokenExpiredError")
              throw new Error("Session Expired, Please Login Again.");
            throw new Error("Invalid Token Provided, Please Log In Again.");
          }
          const user = await User.findById(decoded._id);
          if (!user) throw new Error("Session Expired, Please Login Again.");
          return user;
        } catch (error) {
          console.log(error);
          res.clearCookie("token");
          return undefined;
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.clearCookie("token");
    return undefined;
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      return await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async function (err, decoded) {
          if (err) {
            if (err.name == "TokenExpiredError")
              throw new Error("Session Expired, Please Login Again.");
            throw new Error("Invalid Token Provided, Please Log In Again.");
          }
          let user = await User.findById(decoded._id);
          if (!user) throw new Error("Session Expired, Please Login Again.");
          req.user = user;
          return next();
        }
      );
    }
    throw new Error("Please Log In, To Access This Resource.");
  } catch (err) {
    const { message } = err;
    res.redirect("/");
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role))
        throw new Error("You are not authorized to access this resource");
      return next();
    } catch (err) {
      const { message } = err;
      // console.log("s", message)
      res.redirect("/");
    }
  };
};
