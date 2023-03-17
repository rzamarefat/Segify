import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
import WebCam from '../components/WebCam'
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
                                <h2 className=' mt-5 text-center'>A YOLO-basd tool for segmenting objects in images instantly</h2>
                                
                            </div>
                            <hr className='mt-3'/>
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