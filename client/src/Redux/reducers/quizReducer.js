
const initialState = {
  loading : false , 
  allQuiz : [] , 
  singleQuiz : null , 
  message : null , 
} 

const quizReducer = (state=initialState , action) => {
  if(action.type === "loadQuiz"){
    return ({
      ...state , 
      loading : true  
    })
  }
  else if(action.type === "allQuiz"){
    return ({
      ...state ,
      allQuiz : action.payload , 
      loading : false  
    })
  }
  else if(action.type === "singleQuiz"){
    return ({
      ...state ,
      singleQuiz : action.payload , 
      loading : false  
    })
  }

  return state 
}

export default quizReducer