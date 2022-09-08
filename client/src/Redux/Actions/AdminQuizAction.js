import axios from "axios";

// this action file for Admin

export const createQuizCover = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await axios.post("/api/admin/create-quiz-cover", data , {config});
      console.log(resp.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const createQuizQuestion = (data) => {
  return async (dispatch) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const resp = await axios.post("/api/admin/create-quiz-question", data , {config});
      console.log(resp.data.message);
      // dispatch({
      //   type: "setMessage",
      //   payload: resp.data.message,
      // });
    } catch (error) {
      dispatch({
        type: "setMessage",
        payload: error.response.data.message,
      });
    }
  };
};

export const deleteQuiz = (id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const resp = await axios.delete(`/api/admin/delete-quiz/${id}` , {config});
      // console.log(resp.data);
      dispatch({
        type: "allQuiz",
        payload: resp.data.allQuiz,
      });
      dispatch({
        type: "setMessage",
        payload: resp.data.message,
      });
    } catch (error) {
      // console.log(error.response.data.message);
      dispatch({
        type: "setMessage",
        payload: error.response.data.message,
      });
    }
  };
};

export const quizCreatedSuccessfully = (id) => {
  return async (dispatch) => {

    dispatch({
      type: "setMessage",
      payload: "Quiz Created Successfullly!",
    });
  };
};
