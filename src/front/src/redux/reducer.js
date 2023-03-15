import initialState from "./initiaState"
import { UPLOAD, ANALYSE, TURN_ON_WEBCAM } from "./actionTypes";


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

        case TURN_ON_WEBCAM:
            return {
                ...state,
                isWebcamOn: true,
            }

        default:
            return state;
    }

}


export default reducer