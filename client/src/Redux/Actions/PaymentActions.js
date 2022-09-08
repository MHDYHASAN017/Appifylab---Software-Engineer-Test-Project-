import axios from "axios";

export const createPayment = (data, navigate) => {
  return async (dispatch) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await axios.post(`/api/payment/create-payment`, { data } , {config});
      console.log(resp.data);
      dispatch({
        type: "setMessage",
        payload: resp.data.message,
      });
      navigate("/", { replace: true });
    } catch (error) {
      dispatch({
        type: "setMessage",
        payload: error.response.data.message,
      });
    }
  };
};

export const getAllPayment = () => {
  return async (dispatch) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await axios.get(`/api/payment/get-all-payment` , {config});
      console.log(resp.data.allPay);
      dispatch({
        type: "allPayments",
        payload: resp.data.allPay
      });
    } catch (error) {
      dispatch({
        type: "setMessage",
        payload: error.response.data.message,
      });
    }
  };
};
