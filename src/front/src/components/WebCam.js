import React, { useState } from 'react'
import Webcam from 'react-webcam'
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
          <button onClick={(e) => {
              e.preventDefault()
              setPicture()
            }} type="button" className="btn text-light bg-dark d-flex justify-content-center align-items-center p-4 label-btn">Take a photo</button>
          
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