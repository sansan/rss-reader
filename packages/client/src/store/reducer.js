const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: false
      };
    case "SET_ITEMS":
      return {
        ...state,
        posts: action.payload
      };
    case "SET_STATS":
      return {
        ...state,
        stats: action.payload
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      };
    case "SET_LOADING":
      const { key, value } = action.payload;
      return {
        ...state,
        loading: { ...state.loading, [key]: value }
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
