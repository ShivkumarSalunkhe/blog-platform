import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LoadingSpinner from "./LoadingSpinner";
import { Box, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/router";

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "X", icon: XIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const defaultTheme = createTheme();

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

export default function Blog() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [mainFeaturedPost, setMainFeaturedPost] = React.useState<Post | null>(
    null
  );
  const [spinner, setSpinner] = React.useState(false);
  const router = useRouter();
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
          const sortedPosts = response?.data?.sort(
            (a: Post, b: Post) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setMainFeaturedPost(sortedPosts[0]);
          setPosts(sortedPosts);
        }
        setSpinner(false);
      } catch (error) {
        setSpinner(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ minHeight: "90vh" }}>
        <Header title="NextJS Blog App" />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {user && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditNoteIcon />}
              sx={{ mb: 4, mt: 2 }}
              onClick={() => router.push("/post/create")}
            >
              Create Blog
            </Button>
          )}
        </Box>
        {spinner && <LoadingSpinner />}
        {posts?.length > 0 && (
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {posts.map((post) => (
                <FeaturedPost key={post._id} post={post} />
              ))}
            </Grid>
            <Grid container spacing={5} sx={{ mt: 3, minHeight: "50vh" }}>
              <Main posts={posts} />
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
              />
            </Grid>
          </main>
        )}
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
