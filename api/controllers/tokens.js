const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateToken = require("../models/token_generator");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.status(401).json({ message: "No account with this email" });
  }

  const passwordIsMatch = bcrypt.compareSync(password, user.password);

  if (!passwordIsMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  delete user.password;
  delete user.__v;
  const token = generateToken(user._id);

  return res.status(201).json({ token, user, message: "Login Successful" });
};

module.exports = { login };
