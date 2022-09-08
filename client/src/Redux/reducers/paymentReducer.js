
const initialState = {
    payments : [] 
}

const paymentReducer = (state=initialState , action) => {

    if(action.type === 'allPayments'){
        return ({
            ...state , 
            payments : action.payload 
        })
    }

  return state 
}

export default paymentReducer