import { create } from "zustand";
import { z } from "zod";

const blogPostSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type BlogPost = z.infer<typeof blogPostSchema>;

interface BlogState {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, updatedPost: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPostById: (id: string) => BlogPost | undefined;
}

const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  addPost: (post) => {
    const result = blogPostSchema.safeParse(post);
    if (!result.success) {
      throw new Error("Invalid post data");
    }
    set((state) => ({ posts: [...state.posts, post] }));
  },
  updatePost: (id, updatedPost) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      ),
    }));
  },
  deletePost: (id) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }));
  },
  getPostById: (id) => get().posts.find((post) => post.id === id),
}));

export default useBlogStore;
