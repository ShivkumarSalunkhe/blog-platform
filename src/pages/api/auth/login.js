import connectDB from "../../../utils/db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await connectDB();

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      authorId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
