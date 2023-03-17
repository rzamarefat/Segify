import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Webcam from 'react-webcam'
import axios from 'axios';
import { doCapture, UpdatePredictedLabels } from '../redux/actions';
import PredictedLabelsPanel from './PredictedLabelsPanel';


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
                dispatch(UpdatePredictedLabels(resp.data["predicted_labels"]))
            })
            .then((res)=> {
                console.log("getDataFromBack action successful")
                // dispatch(switchLoaderOnOff())
                return res
            })
            .catch((error) => {
                console.log("getDataFromBack action unsuccessful")
                // dispatch(switchLoaderOnOff())
                console.log(error.response);
            });
        })
        .catch((error) => {
            console.log("postImage action unsuccessful")
            console.log(error.response);
        }); 
 
        // dispatch(switchLoaderOnOff()) 
    }


  return (
    <div>
      <div className='row d-flex flex-column justify-content-center align-items-center'>
      </div>        
        <div>
          {webcamPicture != '' ? (
            <>
              {!predictedLabels &&
                <button onClick={() => postCapture(webcamPicture)} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Analyse</button>}
              {predictedLabels &&
                <>
                  <div className='col-sm-2 d-flex flex-row justify-content-center'>
                            <PredictedLabelsPanel predictedLabels={predictedLabels}/>
                  </div>
                  <button onClick={() => console.log("segment")} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Segment</button>
                </>
              }
            </>
            
          ) : (
            <button onClick={(e) => {
              e.preventDefault()
              capture()
            }} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Capture</button> 
          )}

            {(predictedLabels && isSegmentShown) && 
            <div className='col-sm-12 d-flex flex-row justify-content-center align-items-center mt-3'>
            <img className="preview" src="http://localhost:5001/segmented-image" />
            </div>

            }

        </div>


        <div className="row  d-flex justify-content-center align-items-center">
          <div className='col-sm-6 d-flex justify-content-center align-items-center'>
                                {webcamPicture == '' ? (
                                <Webcam
                                  audio={false}
                                  height={500}
                                  ref={webcamRef}
                                  width={800}
                                  screenshotFormat="image/jpeg"
                                  videoConstraints={videoConstraints}
                                />
                              ) : (
                                <img src={webcamPicture} />
                              )}
          </div>

        </div>
    </div>
  )
}
export default Profile