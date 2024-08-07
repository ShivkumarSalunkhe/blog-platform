import connectDB from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await connectDB();

  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user = new User({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    await user.save();

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Sign Up successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
