const initialState = {
    posts: [],
    post: null
  };
  
  const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_POSTS':
        return {
          ...state,
          posts: action.payload,
        };
      case 'GET_POST':
          return { ...state, post: action.payload };
      case 'UPSERT_POST':
        const updatedPostsList = state.posts.some(post => post._id === action.payload._id)
        ? state.posts.map(post =>
            post._id === action.payload._id ? action.payload : post
          )
        : [...state.posts, action.payload];
       return {
           ...state,
           posts: updatedPostsList
         };
      case 'DELETE_POST': 
          const filteredPosts = state.posts.filter(post => post._id !== action.payload )
          return {...state, posts: filteredPosts}
      default:
        return state;
    }
  };
  
  export default postsReducer;