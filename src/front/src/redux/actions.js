import {UPLOAD, ANALYSE} from './actionTypes'
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
    
    axios
    .post('http://localhost:5001/upload', imageFile, {
        headers: {
            'Content-Type': `application/json`,
        },}
        )
    .then((res) => {
        console.log("IIIINJAJAJJAJAJAJAJAJAJA")
        console.log(res)
    })
    .catch((error) => {
        console.log("IIIINJAJAJJAJAJAJAJAJAJA")
        console.log(error.response);
    });
}


const getImageFromBackend = async(imageFile) => {
    axios.get('http://localhost:5001/image').then(resp => {
        console.log(resp);
        })
        .then((res)=> {
            console.log(res);
        })
        .catch((error) => {
            console.log(error.response);
        });
    
    return {
        type: null,
    }
    
}



export const Analyse = (imageFile) => {
    console.log("inside analyse")
    
    postImage(imageFile)
    // while(true){
        

    // }
    
    return {
        type: ANALYSE,
    }


}

export const UpdateUploadedAreaImage = () => {
    getImageFromBackend()
    return {
        type: null,
    }
}




