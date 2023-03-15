import initialState from "./initiaState"
import { UPLOAD, ANALYSE } from "./actionTypes";


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD:
            return {
                ...state, 
                imageFile: action.payload,
                imageFileForDisplay: URL.createObjectURL(action.payload),
                
            }
        case ANALYSE:
            return {
                ...state,
            }

        default:
            return state;
    }

}


export default reducer