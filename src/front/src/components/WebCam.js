import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Webcam from 'react-webcam'
import axios from 'axios';
import { doCapture, UpdatePredictedLabels, turnOnSegmentedImageArea, switchLoaderOnOff } from '../redux/actions';
import PredictedLabelsPanel from './PredictedLabelsPanel';
import Loader from './Loader';


const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}



const Profile = () => {
  const [picture, setPicture] = useState('')
  const dispatch = useDispatch()

  
  const predictedLabels = useSelector(state => state.predictedLabels)
  const isSegmentShown = useSelector(state => state.isSegmentShown)
  const webcamPicture = useSelector(state => state.webcamPicture)
  const selectedObjectInImage = useSelector(state => state.selectedObjectInImage)
  const loaderDisplayState = useSelector(state => state.loaderDisplayState)

  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    console.log("-----------------------------------------")
    const pictureSrc = webcamRef.current.getScreenshot()
    dispatch(doCapture(pictureSrc))
    console.log("-----------------------------------------")
  })


  const postCapture = async(imageFile)=>{
        console.log(imageFile)
        console.log(typeof(imageFile))

        await axios
        .post('http://localhost:5001/upload', imageFile, {
            headers: {
                'Content-Type': `application/json`,
            },}
            )
        .then(async(res) => {
            
            console.log(res)
            console.log("postCapture action successful")

            await axios.get('http://localhost:5001/upload').then(resp => {
                console.log("============================")
                console.log(resp.data)
                dispatch(switchLoaderOnOff())
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
 
        // dispatch(switchLoaderOnOff()) 
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
                dispatch(turnOnSegmentedImageArea())
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


  return (
    <div>
      <div className='row d-flex flex-column justify-content-center align-items-center'>
      </div>  
        {loaderDisplayState && <Loader/>}      
        {!isSegmentShown && <div>
          {webcamPicture != '' ? (
            <>
              {(!predictedLabels && !loaderDisplayState) &&
                <button onClick={() => postCapture(webcamPicture)} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Analyse</button>}
              
              {predictedLabels &&
                <>
                  <div className='col-sm-2 d-flex flex-row justify-content-center'>
                            <PredictedLabelsPanel predictedLabels={predictedLabels}/>
                  </div>
                  <div className='col-sm-12 d-flex flex-row justify-content-center align-items-center mt-3'>
                        <img className="preview" src="http://localhost:5001/image" />
                  </div>

                  {!selectedObjectInImage &&
                    <button onClick={()=>console.log("Segment button clicked")} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn" disabled>Segment</button>
                    }
                    
                    {selectedObjectInImage &&
                    <button onClick={()=>handleSegment()} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Segment</button>
                    }
                </>
              }
            </>
            
          ) : (
            <button onClick={(e) => {
              e.preventDefault()
              capture()
            }} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Capture</button> 
          )}
        </div>}
        {(predictedLabels && isSegmentShown) && 
            <div className='col-sm-12 d-flex flex-row justify-content-center align-items-center mt-3'>
            <img className="preview" src="http://localhost:5001/segmented-image" />
            </div>

        }


        {!isSegmentShown && 
          <div className="row  d-flex justify-content-center align-items-center">
            <div className='col-sm-6 d-flex justify-content-center align-items-center mt-5'>
                                  {!predictedLabels && <>
                                  {webcamPicture == ''? (
                                  <Webcam
                                    audio={false}
                                    height={500}
                                    ref={webcamRef}
                                    width={800}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                  />
                                ) : 
                                  (<img src={webcamPicture} />)
                                  }
                                </>}
                                  
            </div>
          </div>}
    </div>
  )
}
export default Profile