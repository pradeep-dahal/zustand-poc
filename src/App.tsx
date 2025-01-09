import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import PostForm from "./pages/PostForm";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/create-post" element={<PostForm />} />
      <Route path="/edit-post/:id" element={<PostForm />} />
    </Routes>
  </Router>
);

export default App;
