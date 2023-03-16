import initialState from "./initiaState"
import { UPLOAD, ANALYSE, TURN_ON_WEBCAM, UPADTE_PREDICTED_LABELS, SELECT_OBJECT, TURN_ON_SEGMENT_DISPLAY } from "./actionTypes";


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

        case UPADTE_PREDICTED_LABELS:
            return {
                ...state,
                predictedLabels: action.payload
            }

        case SELECT_OBJECT:
            return {
                ...state,
                selectedObjectInImage: action.payload
            }

        case TURN_ON_SEGMENT_DISPLAY:
            return {
                ...state,
                isSegmentShown: true
            }

        default:
            return state;
    }

}


export default reducer