import connectDB from '../../../utils/db';
import Post from '../../../models/Post';

export default async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const postsss = await Post.find()
      const posts = await Post.find().populate('authorId', 'email firstName lastName');
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
