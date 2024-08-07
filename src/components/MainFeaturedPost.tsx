import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { useRouter } from "next/router";

interface MainFeaturedPostProps {
  post?: {
    content: string;
    _id: string;
    image: string | null;
    imageText: string;
    linkText: string;
    title: string;
    authorId: {
      firstName: string;
      lastName: string;
      email: string;
    };
    createdAt: string;
  } | null;
}

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post } = props;
  const router = useRouter();

  const imagePath = post?.image
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${post?.image}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPtOnE_Fxa4Tkk5utuf3tpKyFE6YRNmLTv8rnEsxt3XP8ok8i18ATmRUMhpZ2Oh2kJnk&usqp=CAU";

  const formattedDate =
    post?.createdAt && format(new Date(post?.createdAt), "MMMM d, yyyy");

  return (
    <>
      {post?.createdAt ? (
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${imagePath})`,
            minHeight: "400px",
          }}
        >
          <img
            style={{ display: "none" }}
            src={imagePath}
            alt={post?.imageText}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {post?.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.850rem",
                    fontFamily: "Arial, sans-serif",
                    color: "inherit",
                    marginBottom: "10px",
                  }}
                >
                  {formattedDate} by {post?.authorId?.firstName}{" "}
                  {post?.authorId?.lastName}
                </Typography>
                <Typography
                  variant="h5"
                  color="inherit"
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
                <Link variant="subtitle1" href="#">
                  {post?.linkText}
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 12,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPtOnE_Fxa4Tkk5utuf3tpKyFE6YRNmLTv8rnEsxt3XP8ok8i18ATmRUMhpZ2Oh2kJnk&usqp=CAU)`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: 3,
            }}
          >
            <Typography variant="h4" color="white" gutterBottom>
              No blog posts available
            </Typography>
          </Box>
        </Paper>
      )}
    </>
  );
}
