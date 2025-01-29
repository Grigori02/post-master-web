import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPost, upsertPost } from "../actions/postActions";
import { useNavigate, useParams } from "react-router-dom";

const UpsertPost = () => {
  const [postData, setPostData] = useState({ text: "", media: "", postId: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const post = useSelector((state) => state.posts.post);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setPostData({ text: post.message.text, media: post.message.media, postId: post._id  });
    }
  }, [post]);


  useEffect(() => {
      if (!postId) {
       return;
      }
      dispatch(getPost(postId))
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMediaChange = (e) => {
    const render = new FileReader();
    render.readAsDataURL(e.target.files[0]);
    render.onload = () => {
      setPostData((prevData) => ({ ...prevData, media: render.result}));
    } 
    render.onerror = error => {
      console.log('error', error);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    setError(null);

    try {
      dispatch(upsertPost( postData));
      setPostData({ text: "", media: "" });
      navigate('/');
    } catch (err) {
      setError("Failed to create/update post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h4" align="center">
        {post ? "Edit Post" : "Create Post"}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Text"
        variant="outlined"
        name="text"
        fullWidth
        multiline
        rows={4}
        value={postData.text}
        onChange={handleChange}
      />
      <Button variant="contained" component="label">
        Upload Media
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleMediaChange}
        />
      </Button>
      {postData.media && (
       <img
       src={`${postData.media}`}
       alt="Image"
       style={{ width: '100px', height: '100px' }}
     />
      )}
      <Button
        variant="contained"
        onClick={handleCreatePost}
        disabled={loading}
      >
        {post ? "Update Post" : "Create Post"}
      </Button>
    </Box>
  );
};

export default UpsertPost;
