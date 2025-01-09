import React from "react";
import { useParams, Link } from "react-router-dom";
import useBlogStore from "../../zustand/useBlogStore";
import { logRender } from "../../utils/logRender";
import { Container, Typography, Button } from "@mui/material";

const PostDetails: React.FC = () => {
  logRender("PostDetails");
  const { id } = useParams<{ id: string }>();
  const post = useBlogStore((state) => state.getPostById(id || ""));

  if (!post) {
    return (
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <Typography variant="h6">Post not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/edit-post/${post.id}`}
        style={{ marginRight: "10px" }}
      >
        Edit Post
      </Button>
      <Button
        color="warning"
        variant="outlined"
        component={Link}
        to="/"
        onClick={() => {
          useBlogStore.getState().deletePost(post.id);
        }}
        style={{ marginRight: "10px" }}
      >
        Delete Post
      </Button>
      <Button variant="outlined" component={Link} to="/">
        Back to Home
      </Button>
    </Container>
  );
};

export default PostDetails;
