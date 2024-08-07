import connectDB from "../../../utils/db";
import Post from "../../../models/Post";
import { protect } from "../../../utils/auth";
import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  await connectDB();

  protect(req, res, async () => {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "File upload failed" });
      }

      const { title, content, categories } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      try {
        const post = new Post({
          title,
          content,
          image: imagePath,
          categories,
          authorId: req.user._id,
        });

        await post.save();

        res.status(201).json(post);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    });
  });
};
