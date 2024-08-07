import * as React from "react";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import axios from "axios";
import { Button, IconButton, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProfileMenu from "@/components/ProfileMenu";

interface Author {
  firstName: string;
  lastName: string;
  email: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string | null;
  imageText: string;
  linkText: string;
  authorId: Author;
  createdAt: string;
}

const SinglePost: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the post ID from the route
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [spinner, setSpinner] = React.useState(false);
  const [user, setUser] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setUser(token);
    }
  }, [router]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      setSpinner(true);
      try {
        const response = await axios.get("/api/posts");
        if (response?.data?.length > 0) {
          setPosts(response.data);
          setSpinner(false);
        }
      } catch (error) {
        setSpinner(false);
      }
    };

    fetchPosts();
  }, []);

  // Find the post by ID
  const post = posts.find((post) => post._id === id);

  const imagePath = post?.image
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.image}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPtOnE_Fxa4Tkk5utuf3tpKyFE6YRNmLTv8rnEsxt3XP8ok8i18ATmRUMhpZ2Oh2kJnk&usqp=CAU";

  const formattedDate =
    post?.createdAt && format(new Date(post?.createdAt), "MMMM d, yyyy");

  const handleLoginClick = () => {
    router.push("/auth");
  };

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Blog
        </Typography>

        {user ? (
          <ProfileMenu />
        ) : (
          <Button
            variant="outlined"
            size="small"
            sx={{ marginRight: "10px" }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        )}
      </Toolbar>
      {posts?.length > 0 && (
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${imagePath})`,
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
                  {formattedDate} by {post?.authorId.firstName}{" "}
                  {post?.authorId.lastName}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {post?.content}
                </Typography>
                <Link variant="subtitle1" href="#">
                  {post?.linkText}
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
      {spinner && <LoadingSpinner />}
    </>
  );
};

export default SinglePost;
