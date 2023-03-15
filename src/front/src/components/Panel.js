import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Analyse, Upload, UpdateUploadedAreaImage, TurnWebcamOn } from '../redux/actions';
import { ChangeEvent, useState } from 'react';

const Panel = ({text}) => {
    // const [file, setFile] = useState();
    const dispatch = useDispatch()
    const uploadedImage = useSelector(state => state.imageFile)
    const uploadedImageFileForDisplay = useSelector(state => state.imageFileForDisplay)
    const isWebcamOn = useSelector(state => state.isWebcamOn)


    // useEffect(() => {
    //     dispatch(UpdateUploadedAreaImage());
    // }, [])


    const handleButtonClick = (text)=>{
        if (text == "Upload an image"){
            console.log("1")
            console.log(text)
        }else if (text == "Take a photo"){
            console.log("2")
            console.log(text)
            dispatch(TurnWebcamOn())
        }
            
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            dispatch(Upload(e.target.files[0]))
        }
          
         };

  return (
        <>
            {text === "Upload an image" && 
            <>
                <label htmlFor="files" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">{text}</label>
                <input id="files" type="file"  style={{visibility:'hidden'}} onClick={()=>handleButtonClick(text)} onChange={(e) => handleFileChange(e)} className='bg-dark d-flex justify-content-center align-items-center'/>
                
            </>
            
            }
            {text === "Take a photo" && 
            <>
                <button onClick={()=>handleButtonClick(text)} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Take a photo</button>
            </>
            }
            {text === "Analyse" && 
            <>
                <div className='row d-flex flex-column justify-content-center align-items-center'>
                    <button onClick={()=>dispatch(Analyse(uploadedImage))} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Analyse</button>
                </div>

                <div className='row d-flex flex-row justify-content-center align-items-center mt-3'>
                        <div className='col-sm-12 d-flex justify-content-center align-items-center'>
                            <img className="preview" src={uploadedImageFileForDisplay} alt="" />    
                            {/* <img src="http://localhost:5001/image" /> */}
                        </div>
                        
                </div>
            </>
            }
            
        </>
        
        
    
  )
}

export default Panel