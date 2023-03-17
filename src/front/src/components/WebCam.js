import React, { useState } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios';


const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}



const Profile = () => {
  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
  const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
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
                // dispatch(UpdatePredictedLabels(resp.data["predicted_labels"]))
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
        <div className="row  d-flex justify-content-center align-items-center">
          <div className='col-sm-6 d-flex justify-content-center align-items-center'>
                                {picture == '' ? (
                                <Webcam
                                  audio={false}
                                  height={500}
                                  ref={webcamRef}
                                  width={800}
                                  screenshotFormat="image/jpeg"
                                  videoConstraints={videoConstraints}
                                />
                              ) : (
                                <img src={picture} />
                              )}
          </div>

        </div>
        
      <div>
        {picture != '' ? (
          <button onClick={() => postCapture(picture)} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Analyse</button>
          
        ) : (
          <button onClick={(e) => {
            e.preventDefault()
            capture()
          }} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Capture</button> 
        )}
      </div>
    </div>
  )
}
export default Profile