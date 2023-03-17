from flask import Flask, request, send_file
import requests
from flask_restful import Api, Resource, reqparse
from Segmenter import Segmenter
import werkzeug
import cv2
from flask_cors import CORS
import io
import numpy as np
import base64
from config import *
import json
from uuid import uuid1
from PIL import Image
import re
  
app =   Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, origins="*")

api =  Api(app)

fs = Segmenter()

class UploadImage(Resource):
    def get(self):
        print("get in the back is called")
        with open(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "predicted_labels.json"), 'r') as f:
            predicted_labels = json.load(f)

        return {
            "predicted_labels": predicted_labels
        }
    
    def likeBase64(s:str) -> bool:
        
        return 

    def post(self):
        

        try:
            print("88888888888888888888888888888888888888888888888888888")
            try:
                decoded = cv2.imdecode(np.frombuffer(request.data, np.uint8), -1)
                if os.path.isfile(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg")):
                    os.remove(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"))
                cv2.imwrite(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"), decoded)

            except Exception as e:
                print("Error in upload style data deliver")
                print(e)

                try: 
                    s = request.get_data(request.data, as_text=True).replace("data:image/jpeg;base64,", "")
                    img = Image.open(io.BytesIO(base64.b64decode(s)))

                    if os.path.isfile(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg")):
                        os.remove(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"))

                    img.save(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"))
                    decoded = cv2.imread(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"))
                except Exception as e:
                    print("Error in webcam style data deliver")
                    print(e)
            print("88888888888888888888888888888888888888888888888888888")
            
            
            
            

            segmented_images, boxed_image, predicted_labels, id_holder = fs.analyse(decoded)

            label_data = {}
            for pred, id_ in zip(predicted_labels, id_holder):
                label_data[f"{pred}__{id_}"] = id_

            with open(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "predicted_labels.json"), 'w') as f:
                json.dump(label_data, f, indent=2)
            
            for s, pred, id_ in zip(segmented_images, predicted_labels, id_holder):
                name_of_image = f"segmented__{pred}__{id_}.jpg"
                cv2.imwrite(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, name_of_image), s)


            cv2.imwrite(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "boxed.jpg"), boxed_image)

        except Exception as e:
            print(e)
            return None
    
class ImagePage(Resource):
    def get(self):
        if not(os.path.isfile(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"))):
            return None
        
        return send_file(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "boxed.jpg"),  mimetype='image/jpg')

class SegmentedImagePage(Resource):
    def post(self):
        print("request inside segmented page", request.data)
        data = json.loads(request.data.decode())

        with open(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "selected_object_from_image.json"), 'w') as f:
            json.dump(data["segmented"]["image"], f, indent=2)
        
        return None

    def get(self):
        
        with open(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "selected_object_from_image.json"), 'r') as f:
            selected_object = json.load(f)

        print("iside get of segmented")
        print(selected_object)
        print(type(selected_object))
        return send_file(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, f"segmented__{selected_object['id']}.jpg"),  mimetype='image/jpg')
  

api.add_resource(UploadImage,'/upload')
api.add_resource(ImagePage,'/image')
api.add_resource(SegmentedImagePage,'/segmented-image')
  
  
if __name__=='__main__':
    app.run(debug=True, port=5001)
