import {UPLOAD, ANALYSE, TURN_ON_WEBCAM} from './actionTypes'
import initialState from './initiaState'
import axios from 'axios';


export const Upload = (imageFile) => {
    return {
        type: UPLOAD,
        payload: imageFile
    }
}

const postImage = async(imageFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile)
    
    const res = await axios
    .post('http://localhost:5001/upload', imageFile, {
        headers: {
            'Content-Type': `application/json`,
        },}
        )
    .then(async(res) => {
        
        console.log(res)
        console.log("postImage action successful")
        const labels = await getDataFromBack()
        console.log("labels.data:", labels)

        // getDataFromBack()
    })
    .catch((error) => {
        console.log("postImage action unsuccessful")
        console.log(error.response);
    });


    
}

const getDataFromBack = () => {
    axios.get('http://localhost:5001/upload').then(resp => {
        console.log(resp);
        })
        .then((res)=> {
            console.log("getDataFromBack action successful")
            
            console.log(res);
            return res
        })
        .catch((error) => {
            console.log("getDataFromBack action unsuccessful")
            console.log(error.response);
        });
    
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



