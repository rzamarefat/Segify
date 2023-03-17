import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Analyse, Upload, UpdatePredictedLabels, TurnWebcamOn, turnOnSegmentedImageArea, switchLoaderOnOff } from '../redux/actions';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import PredictedLabelsPanel from './PredictedLabelsPanel';
import Loader from './Loader';

const Panel = ({text}) => {
    // const [file, setFile] = useState();
    const dispatch = useDispatch()
    const uploadedImage = useSelector(state => state.imageFile)
    const uploadedImageFileForDisplay = useSelector(state => state.imageFileForDisplay)
    const isWebcamOn = useSelector(state => state.isWebcamOn)
    const predictedLabels = useSelector(state => state.predictedLabels)
    const selectedObjectInImage = useSelector(state => state.selectedObjectInImage)
    const isSegmentShown = useSelector(state => state.isSegmentShown)
    const loaderDisplayState = useSelector(state => state.loaderDisplayState)


    // useEffect(() => {
    //     dispatch(UpdateUploadedAreaImage());
    // }, [])


    const postImage = async(imageFile)=>{


        const reader = new FileReader();
        reader.readAsDataURL(imageFile)

        dispatch(switchLoaderOnOff())
    
        await axios
        .post('http://localhost:5001/upload', imageFile, {
            headers: {
                'Content-Type': `application/json`,
            },}
            )
        .then(async(res) => {
            
            console.log(res)
            console.log("postImage action successful")

            await axios.get('http://localhost:5001/upload').then(resp => {
                console.log("============================")
                console.log(resp.data)
                dispatch(UpdatePredictedLabels(resp.data["predicted_labels"]))
            })
            .then((res)=> {
                console.log("getDataFromBack action successful")
                dispatch(switchLoaderOnOff())
                return res
            })
            .catch((error) => {
                console.log("getDataFromBack action unsuccessful")
                dispatch(switchLoaderOnOff())
                console.log(error.response);
            });

            
        })
        .catch((error) => {
            console.log("postImage action unsuccessful")
            console.log(error.response);
        });  
    }

    const handleSegment = async() => {
        const data = new FormData();
        data.append("segmented-image-id", selectedObjectInImage)
        await axios.post('http://localhost:5001/segmented-image', data, {
            headers: {
                'Content-Type': `application/json`,
            }})
            .then(async(res) => {
            
                console.log(res)
                console.log("handleSegment action successful")
    
                await axios.get('http://localhost:5001/segmented-image').then(resp => {
                    console.log(resp.data)
                })
                .then((res)=> {
                    console.log("fetch segmented image from back action successful")
                    dispatch(turnOnSegmentedImageArea())
                    return res
                })
                .catch((error) => {
                    console.log("fetch segmented image from back action unsuccessful")
                    console.log(error.response);
                });
    
                
            })
            .catch((error) => {
                console.log("handleSegment action unsuccessful")
                console.log(error.response);
            });
    }
    
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

    const handleFileChange = (e) => {
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
            {(text === "Analyse" && !predictedLabels) &&
            <>  
                
                <div className='row d-flex flex-column justify-content-center align-items-center'>
                    {loaderDisplayState && <Loader/>}

                    {!loaderDisplayState && <button onClick={()=>postImage(uploadedImage)} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Analyse</button>}
                </div>

                <div className='row d-flex flex-row justify-content-center align-items-center mt-3'>
                        {!predictedLabels && 
                            <div className='col-sm-12 d-flex justify-content-center align-items-center'>
                                <img className="preview" src={uploadedImageFileForDisplay} alt="" />    
                            </div>
                        }
                </div>
            </>
            }


            {(predictedLabels && !isSegmentShown) &&
                <div className='row d-flex justify-content-center align-items-centers'>
                
                    <h4 className='text-center'>We have detected multiple objects for segmentation as the following. Choose one of them and click segment button</h4>
                    
                    <div className='col-sm-2 d-flex flex-row justify-content-center'>
                        <PredictedLabelsPanel predictedLabels={predictedLabels}/>
                    </div>

                    <div className='col-sm-12 d-flex flex-row justify-content-center align-items-center mt-3'>
                        {/* <img className="preview" src={uploadedImageFileForDisplay} alt="" /> */}
                        <img className="preview" src="http://localhost:5001/image" />
                    </div>
                    
                    

                    {!selectedObjectInImage &&
                    <button onClick={()=>console.log("Segment button clicked")} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn" disabled>Segment</button>
                    }
                    
                    {selectedObjectInImage &&
                    <button onClick={()=>handleSegment()} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Segment</button>
                    }
                </div>
            }
            {isSegmentShown &&
                <div className='col-sm-12 d-flex flex-row justify-content-center align-items-center mt-3'>
                
                <img className="preview" src="http://localhost:5001/segmented-image" />
                </div>
                
            }

            
        </>
        
        
    
  )
}

export default Panel