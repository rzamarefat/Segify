import initialState from "./initiaState"
import { UPLOAD, ANALYSE } from "./actionTypes";


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD:
            return {
                ...state, imageFile: action.payload
            }
            
        default:
            return state;
    }

}


export default reducer