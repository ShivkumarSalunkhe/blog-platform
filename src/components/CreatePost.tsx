import {
  Box,
  styled,
  FormControl,
  Button,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import withAuth from "@/pages/auth/withAuth";
import LoadingSpinner from "./LoadingSpinner";
import { useToast } from "./ToastNotification";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextFeild = styled(InputBase)`
  flex: 1;
  margin: 0px 30px;
  font-size: 20px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

interface Post {
  title: string;
  content: string;
  image: string | null;
  categories: string;
}

const initialPost: Post = {
  title: "",
  content: "",
  image: null,
  categories: "",
};

const CreatePost: React.FC = () => {
  const [post, setPost] = useState<Post>(initialPost);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const [spinner, setSpinner] = React.useState(false);
  const { showToast } = useToast();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPost({ ...post, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("categories", post.categories);
    if (image) {
      formData.append("image", image);
    }
    setSpinner(true);
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage or wherever it's stored
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        showToast("Blog created successfully..!", "success");
        router.push("/dashboard");
        // Reset form after successful post creation
        setPost(initialPost);
        setImage(null);
        setSpinner(true);
      } else {
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      showToast("Went something wrong", "error");
    }
  };

  const url = post.image
    ? post.image
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2Vd2h8MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  return (
    <>
      <Container>
        <Image src={url} alt="banner" />
        <StyledFormControl>
          <label htmlFor="fileInput">
            <Add fontSize="large" color="action" style={{ color: "red" }} />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <InputTextFeild
            placeholder="Title"
            onChange={handleChange}
            name="title"
            value={post.title}
            style={{ color: "red" }}
          />
          <InputTextFeild
            placeholder="Category"
            onChange={handleChange}
            name="categories"
            value={post.categories}
            style={{ color: "red" }}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Publish
          </Button>
        </StyledFormControl>
        <TextArea
          minRows={5}
          placeholder="Tell Your Story.."
          onChange={handleChange}
          name="content"
          value={post.content}
          style={{ color: "red" }}
        />
      </Container>
      {spinner && <LoadingSpinner />}
    </>
  );
};

export default withAuth(CreatePost);
