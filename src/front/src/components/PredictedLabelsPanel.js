import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectObject } from '../redux/actions';

const PredictedLabelsPanel = ({predictedLabels}) => {
  const dispatch = useDispatch()

  const selectedObjectInImage = useSelector(state => state.selectedObjectInImage)
  
  const handlePredictedObjectClick = (objectID) =>{

    dispatch(selectObject(objectID))

  }
  

  console.log(selectedObjectInImage)
  return (
    <>  
      {Object.entries(predictedLabels).map(l => {
        let color = (255,255,255)//l[1]
        return (
            <div>
              <div className="p-2">
                  <div style={
                    selectedObjectInImage === l[0]
                    ? 
                    {backgroundColor: color, cursor: "pointer", border: "2px solid"}
                    :
                    {backgroundColor: color, cursor: "pointer", border: "2px solid #D3D3D3"}
                  }
                  className="p-4 d-flex flex-row justify-content-center align-items-center  rounded-circle"
                  onClick={() => handlePredictedObjectClick(l[0])}
                  >
                    <h4>
                      {l[0].split("__")[0]}
                    </h4>
                    <h4>:</h4>
                    <h4>
                      {l[1]}
                    </h4>
                  </div>
              </div>
            </div>
            
        )
      })}
    </>
    
  )
}

export default PredictedLabelsPanel