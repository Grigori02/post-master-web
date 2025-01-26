import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts } from '../actions/postActions';
import { Button, Card, CardActions, CardContent, CardMedia, Grid2, Typography } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.posts);
  const isAuthenticated = useSelector((state) => state.user?.token);
  
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const onEdit = (postId) => {
    navigate(`/posts/${postId}/edit`);
  }

  const onDelete = (postId) => {
    dispatch(deletePost(postId))
  } 

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      {posts?.map(({ message, _id, author }, index) => (
        <Grid2 xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={message.media}
              alt="Post Image"
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Text: {message.text}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Author: {author.username}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary" onClick={() => onEdit(_id)}>
                Edit
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={() => onDelete(_id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default HomePage;
