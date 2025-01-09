import React from "react";
import { Link } from "react-router-dom";
import useBlogStore from "../../zustand/store";
import { logRender } from "../../utils/logRender";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const Home: React.FC = () => {
  logRender("Home");
  const posts = useBlogStore((state) => state.posts);

  return (
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Blog
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create-post"
        style={{ marginBottom: "20px" }}
      >
        Create New Post
      </Button>
      {posts.length === 0 ? (
        <Typography variant="body1">
          No posts available. Create a new post!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.slice(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/post/${post.id}`}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    component={Link}
                    to={`/edit-post/${post.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    color="warning"
                    size="small"
                    variant="outlined"
                    component={Link}
                    to="#"
                    onClick={() => {
                      useBlogStore.getState().deletePost(post.id);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
