const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload
      };
    case "ADD_POST":
      return {
        ...state,
        posts: state.posts.concat(action.payload)
      };
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
