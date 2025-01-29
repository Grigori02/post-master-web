import axios from 'axios';

export const getPosts = () => async(dispatch, getState) => {
    try {
      const token = getState().user.token || localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/posts`, 
         {
          headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json',
           }
          });

      dispatch({
        type: 'GET_POSTS',
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
};

export const getPost = (postId) => async(dispatch, getState) => {
  try {
    const token = getState().user.token || localStorage.getItem('token');
    const response = await axios.get(`http://localhost:5001/api/posts/${postId}`, 
       {
        headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
         }
        });
    dispatch({
      type: 'GET_POST',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};


export const upsertPost = (postData) => async (dispatch, getState) => {
  try {
    const token = getState().user.token || localStorage.getItem('token');
    const response = await axios({
      method:"POST",
      url: `http://localhost:5001/api/posts`,
      data: JSON.stringify({
        base64: postData.media,
        text: postData.text,
        postId : postData?.postId || null
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
      },

    });

    dispatch({
      type: "UPSERT_POST",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error upserting post:", error);
  }
};

export const deletePost = (postId) => async(dispatch, getState) => {
  try {
    const token = getState().user.token || localStorage.getItem('token');
     await axios.delete(`http://localhost:5001/api/posts/${postId}`, 
       {
        headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
         }
        });
    dispatch({
      type: 'DELETE_POST',
      payload: postId,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
