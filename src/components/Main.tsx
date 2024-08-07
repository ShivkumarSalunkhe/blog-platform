// In Main.tsx
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";
import { format } from "date-fns";

interface Post {
  content: string;
  _id: string;
  image: string;
  imageText: string;
  linkText: string;
  imageLabel: string;
  title: string;
  authorId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}

interface MainProps {
  posts: Post[];
}

export default function Main(props: MainProps) {
  const { posts } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      {posts?.map((post) => {
        const formattedDate =
          post?.createdAt && format(new Date(post?.createdAt), "MMMM d, yyyy");

        return (
          <div key={post._id}>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: "0.850rem",
                fontFamily: "Arial, sans-serif",
                color: "inherit",
              }}
            >
              {formattedDate} by {post.authorId.firstName}{" "}
              {post.authorId.lastName}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Markdown className="markdown" key={post.content?.substring(0, 40)}>
              {post.content}
            </Markdown>
          </div>
        );
      })}
    </Grid>
  );
}
