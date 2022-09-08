import axios from "axios";

export const loadCurrentUser = () => {
  return async (dispatch) => {
    // console.log("hh");
    
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
      token = JSON.parse(token);
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({
        type: "setLoading",
      });
      const res = await axios.get("/api/auth/current_user", config);
      // console.log(res.data);
      dispatch({
        type: "loadCurrentUser",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response.data.message,
      });
      localStorage.removeItem("token");
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await axios.post(`/api/auth/register`, userData, { config });

      if (resp) {
        dispatch({
          type: "register",
          payload: resp.data,
        });
      }
    } catch (error) {
      // console.log(error.response.data.message);
      dispatch({
        type: "setMessage",
        payload: error.response.data.message,
      });
      localStorage.removeItem("token");
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await axios.post(`/api/auth/login`, userData, { config });
      //   console.log(resp.data);
      if (resp) {
        localStorage.setItem("token", JSON.stringify(resp.data.userInfo.token));
        dispatch({
          type: "login",
          payload: resp.data,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      localStorage.removeItem("token");
      dispatch({
        type: "setMessage",
        payload: error.response.data.message,
      });
    }
  };
};

export const clearMessage = () => {
  return async (dispatch) => {
    dispatch({
      type: "clearMessage",
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: "logout",
    });
    localStorage.removeItem("token");
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    // console.log("hh");
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
      token = JSON.parse(token);
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({
        type: "setLoading",
      });
      const res = await axios.get("/api/auth/all-users", config);
      // console.log(res.data);
      dispatch({
        type: "getAllUsers",
        payload: res.data.users,
      });
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response.data.message,
      });
      localStorage.removeItem("token");
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    // console.log("hh");
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
      token = JSON.parse(token);
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({
        type: "setLoading",
      });
      const res = await axios.delete(`/api/auth/delete-user/${id}`, config);
      console.log(res.data.users);
      dispatch({
        type: "deleteUser",
        payload: res.data.users,
      });
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response.data.message,
      });
    }
  };
};
