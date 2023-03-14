import {UPLOAD, ANALYSE} from './actionTypes'
import initialState from './initiaState'


export const Upload = (imageFile) => {
    return {
        type: UPLOAD,
        payload: imageFile
    }
}

export const Analyse = (imageFile) => {
    const data = new FormData();
    
    data.append("file", imageFile);
    const headers = {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}

    console.log(data.get("file"))
    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data,
        mode: "no-cors",
        headers:headers,
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

    return {
        type: null,
    }
}



