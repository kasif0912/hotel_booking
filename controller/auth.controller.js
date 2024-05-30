const jwt = require("../constant/jwtProvider");
const User = require("../models/user.schema");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { fullName, password, email } = req.body;
  if (!fullName || !email || !password) {
    return res.status(402).json("Fill all the details");
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json("User already exist");
    }
    // hashing the password
    const hashPassword = await bcrypt.hash(password, 8);
    const user = new User({
      fullName,
      email,
      password: hashPassword,
    });
    const createdUser = await user.save();
    // remove password in response
    const sanitizedUser = await User.findById(createdUser._id).select(
      "-password"
    );
    return res
      .status(200)
      .json({ sanitizedUser, message: "successfully registered" });
  } catch (error) {
    return res.status(401).json("Failed,Try again");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Enter allt the details");
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json("User not found with this email");
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json("Password does not matched");
    }

    // generate access token
    const token = await jwt.generateToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");
    return res
      .status(200)
      .json({ loggedInUser, token, message: "login successfully" });
  } catch (error) {}
};

module.exports = { register, login };
