import {UPLOAD, ANALYSE, TURN_ON_WEBCAM, UPADTE_PREDICTED_LABELS, SELECT_OBJECT} from './actionTypes'
import initialState from './initiaState'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"

export const UpdatePredictedLabels = (labels)=>{
    return {
        type: UPADTE_PREDICTED_LABELS,
        payload: labels
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

    console.log("))))))))))))))))))))")
    

    
    
    return {
        type: ANALYSE,
    }


}



export const TurnWebcamOn = () =>{
    return {
        type: TURN_ON_WEBCAM,
    }
}



