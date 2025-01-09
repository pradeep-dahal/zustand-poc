import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import useBlogStore from "../../zustand/useBlogStore";
import { logRender } from "../../utils/logRender";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type PostFormData = z.infer<typeof postSchema>;

const PostForm: React.FC = () => {
  logRender("PostForm");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addPost = useBlogStore((state) => state.addPost);
  const updatePost = useBlogStore((state) => state.updatePost);
  const getPostById = useBlogStore((state) => state.getPostById);

  const isEditMode = Boolean(id);
  const existingPost = isEditMode ? getPostById(id || "") : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: existingPost || { title: "", content: "" },
  });

  const onSubmit = (data: PostFormData) => {
    if (isEditMode && existingPost) {
      updatePost(existingPost.id, data);
    } else {
      addPost({ id: Date.now().toString(), ...data });
    }
    navigate("/");
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? "Edit Post" : "Create Post"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="Title"
          fullWidth
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register("title")}
        />
        <TextField
          label="Content"
          multiline
          rows={4}
          fullWidth
          error={!!errors.content}
          helperText={errors.content?.message}
          {...register("content")}
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? "Update" : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default PostForm;
