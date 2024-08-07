import connectDB from "../../../utils/db";
import Post from "../../../models/Post";
import { protect } from "../../../utils/auth";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const { author } = req.query;

    if (!author) {
      return res.status(400).json({ message: "Author ID is required" });
    }

    try {
      const posts = await Post.find({ authorId: author }).populate(
        "authorId",
        "email firstName lastName"
      );
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default async (req, res) => {
  await protect(req, res, async () => handler(req, res));
};
