import { combineReducers } from "redux";
import quizReducer from "./quizReducer";
import userReducer from "./userReducer";
import paymentReducer from "./paymentReducer";

const rootReducer = combineReducers({
    quizReducer : quizReducer,
    userReducer : userReducer , 
    paymentReducer : paymentReducer 
});

export default rootReducer;
