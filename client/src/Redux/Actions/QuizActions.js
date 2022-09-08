import axios from "axios";

// this action file for user

export const getSingleQuiz = (id) => {
  return async (dispatch) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: "loadQuiz",
    });

    try {
      const resp = await axios.get(`/api/admin/get-single-quiz/${id}` , {config});
      // console.log(resp.data);
      dispatch({
        type: "singleQuiz",
        payload: resp.data.singleQuiz,
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const getAllQuiz = (data) => {
  return async (dispatch) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: "loadQuiz",
    });

    try {
      const resp = await axios.get("/api/admin/get-all-quiz", data , {config});
      dispatch({
        type: "allQuiz",
        payload: resp.data.allQuiz,
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const submitQuiz = (data, quiz_id, navigate) => {
  return async (dispatch) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: "loadQuiz",
    });

    try {
      const resp = await axios.post(`/api/admin/submit-quiz/${quiz_id}`, data , {config});
      // console.log(resp.data);
      if (resp.data) {
        navigate("/", {
          replace: true,
        });
      }
      // dispatch({
      //   type: "allQuiz",
      //   payload: resp.data.allQuiz,
      // });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const filterQuizType = (quiz) => {
  return async (dispatch) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: "loadQuiz",
    });
    try {
      const resp = await axios.post(`/api/admin/filter-quiz-type/`, { quiz } , {config});
      dispatch({
        type: "allQuiz",
        payload: resp.data.allQuiz,
      });
    } catch (error) {
      dispatch({
        type: "setMessage",
        payload: error.response.data.message,
      });
    }
  };
};
