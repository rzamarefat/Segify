import {UPLOAD, ANALYSE, TURN_ON_WEBCAM, UPADTE_PREDICTED_LABELS, SELECT_OBJECT, TURN_ON_SEGMENT_DISPLAY, SWITCH_LOADER_ON_OFF, CAPTURE} from './actionTypes'
import initialState from './initiaState'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"

export const UpdatePredictedLabels = (labels)=>{
    return {
        type: UPADTE_PREDICTED_LABELS,
        payload: labels
    }

}
export const doCapture = (picture) => {
    return {
        type: CAPTURE,
        payload: picture,
    }
}
export const switchLoaderOnOff = () => {
    return {
        type: SWITCH_LOADER_ON_OFF,
    }
}
export const turnOnSegmentedImageArea = () => {
    return {
        type: TURN_ON_SEGMENT_DISPLAY,
    }
}


export const selectObject = (objectID) => {
    return {
        type: SELECT_OBJECT,
        payload: objectID
    }
}



export const Upload = (imageFile) => {
    return {
        type: UPLOAD,
        payload: imageFile
    }
}

const postImage = async(imageFile) => {
     
}


const getImageFromBackend = () => {
    axios.get('http://localhost:5001/image').then(resp => {
        console.log(resp);
        })
        .then((res)=> {
            console.log("getImageFromBackend action successful")
            console.log(res);
        })
        .catch((error) => {
            console.log("getImageFromBackend action unsuccessful")
            console.log(error.response);
        });
    
    return {
        type: null,
    }
    
}


export const UpdateUploadedAreaImage = () => {
    getImageFromBackend()
    return {
        type: null,
    }
}


export const Analyse = (imageFile) => {
    console.log("inside analyse")
    
    postImage(imageFile)

    return {
        type: ANALYSE,
    }


}



export const TurnWebcamOn = () =>{
    return {
        type: TURN_ON_WEBCAM,
    }
}



