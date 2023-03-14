import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Analyse, Upload } from '../redux/actions';
import { ChangeEvent, useState } from 'react';

const Button = ({text}) => {
    // const [file, setFile] = useState();
    const dispatch = useDispatch()
    const uploadedImage = useSelector(state => state.imageFile)


    const handleButtonClick = (text)=>{
        if (text == "Upload an image"){
            console.log("1")
            console.log(text)
        }else if (text == "Take a photo"){
            console.log("2")
            console.log(text)
        }else if (text == "Analyse"){
            dispatch(Analyse(uploadedImage))
        }
            
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.files) {
            dispatch(Upload(URL.createObjectURL(e.target.files[0])))
        }
          
         };

  return (
        <>
            {text === "Upload an image" && 
            <>
                <label htmlFor="files" class="btn btn-dark label-btn">{text}</label>
                <input id="files" type="file"  style={{visibility:'hidden'}} onClick={()=>handleButtonClick(text)} onChange={(e) => handleFileChange(e)} className='bg-dark d-flex justify-content-center align-items-center'/>
                
            </>
            
            }
            {text === "Take a photo" && 
            <>
                <button onClick={()=>handleButtonClick(text)} type="button" class="btn text-light bg-dark d-flex justify-content-center align-items-center p-5 label-btn">Take a photo</button>
            </>
            }
            {text === "Analyse" && 
            <>
                <img className="preview" src={uploadedImage} alt="" />
                <button onClick={()=>handleButtonClick(text)} type="button" class="btn text-light bg-dark d-flex justify-content-center align-items-center p-5 label-btn">Analyse</button>
                
            </>
            }
            
        </>
        
        
    
  )
}

export default Button