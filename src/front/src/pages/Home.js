import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
import WebCam from '../components/WebCam'
import Profile from '../components/Profile'
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
    const uploadedImageFileForDisplay = useSelector(state => state.imageFileForDisplay)
    const isWebcamOn = useSelector(state => state.isWebcamOn)
    
    
    return (
        <>
            <Navbar/>
            <div className='container'>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-sm-10 d-flex align-items-center justify-content-center '>
                        <div className='p-5'>
                            <div className='d-flex align-items-center justify-content-center flex-column'>
                                <h1 className='display-1'>Segify</h1>
                                <h4 className='display-6 mt-5 text-center'>A tool for segmenting objects in images instantly</h4>
                            </div>
                            <div>
                                {(!uploadedImageFileForDisplay && !isWebcamOn)? <Panel text="Upload an image"/>: <></>}
                                {(!uploadedImageFileForDisplay && !isWebcamOn)? <Panel text="Take a photo"/>: <></>}
                                {uploadedImageFileForDisplay && <Panel text="Analyse"/>}


                                {isWebcamOn && <WebCam/>}

                            </div>
                            
                        </div>
                        
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default Home