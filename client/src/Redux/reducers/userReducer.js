const initialState = {
  loading: false,
  message: "",
  user: null,
  token: null,
  isAuth: false,
  users: [],
};

const userReducer = (state = initialState, action) => {
  if (action.type === "setLoading") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "register") {
    // console.log(action.payload);
    return {
      ...state,
      message: action.payload.message,
      loading: false,
    };
  } else if (action.type === "login") {
    //   console.log(action.payload);
    return {
      ...state,
      user: action.payload.userInfo,
      isAuth: true,
      message: action.payload.message,
      loading: false,
    };
  } else if (action.type === "loadCurrentUser") {
    return {
      ...state,
      user: action.payload,
      isAuth: true,
      loading: false,
    };
  } else if (action.type === "getAllUsers") {
    return {
      ...state,
      users : action.payload , 
      loading: false,
    };
  } 
  else if (action.type === "deleteUser") {
    return {
      ...state,
      users : action.payload,
      loading: false,
    };
  } 
  else if (action.type === "setMessage") {
    console.log(action.payload);
    return {
      ...state,
      message: action.payload,
      loading: false,
    };
  } else if (action.type === "clearMessage") {
    return {
      ...state,
      message: "",
      loading: false,
    };
  } else if (action.type === "error" || action.type === "logout") {
    return initialState;
  }
  return state;
};

export default userReducer;
