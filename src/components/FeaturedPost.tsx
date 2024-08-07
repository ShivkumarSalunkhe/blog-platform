import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { format } from "date-fns";
import { Link } from "@mui/material";

interface FeaturedPostProps {
  post: {
    createdAt: string;
    _id: string;
    content: string;
    imageLabel: string;
    image: string;
    title: string;
    authorId: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;
  const imagePath = post?.image
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${post?.image}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPtOnE_Fxa4Tkk5utuf3tpKyFE6YRNmLTv8rnEsxt3XP8ok8i18ATmRUMhpZ2Oh2kJnk&usqp=CAU";

  const formattedDate =
    post?.createdAt && format(new Date(post?.createdAt), "MMMM d, yyyy");

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex", minHeight: "280px" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontSize: "0.620rem", fontFamily: "Arial, sans-serif" }}
            >
              {formattedDate} by {post?.authorId?.firstName}{" "}
              {post?.authorId?.lastName}
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 5,
              }}
            >
              {post?.content}
            </Typography>
            <Link href={`/post/${post._id}`}>Continue reading...</Link>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 200, display: { xs: "none", sm: "block" } }}
            image={imagePath}
            alt={post.image}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
