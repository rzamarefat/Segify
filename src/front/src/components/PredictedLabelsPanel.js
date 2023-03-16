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
        let color = 'rgb(' + l[1].join(', ') + ')'
        return (
            <div>
              <div className="p-2">
                  <div style={
                    selectedObjectInImage === l[0]
                    ? 
                    {backgroundColor: color, cursor: "pointer", border: "2px solid"}
                    :
                    {backgroundColor: color, cursor: "pointer"}
                  }
                  className="p-2 d-flex justify-content-center align-items-center"
                  onClick={() => handlePredictedObjectClick(l[0])}
                  >
                    <h3>
                      {l[0].split("__")[0]}
                    </h3>
                </div>
              </div>
            </div>
            
        )
      })}
    </>
    
  )
}

export default PredictedLabelsPanel