from flask import Flask, request, send_file
import requests
from flask_restful import Api, Resource, reqparse
from FaceSegmenter import FaceSegmenter
import werkzeug
import cv2
from flask_cors import CORS
import io
import numpy as np
import base64
from config import *
import json
from uuid import uuid1
  
app =   Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, origins="*")

api =  Api(app)

fs = FaceSegmenter()

class UploadImage(Resource):
    def get(self):
        print("get in the back is called")
        with open(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "predicted_labels.json"), 'r') as f:
            predicted_labels = json.load(f)

        return {
            "predicted_labels": predicted_labels
        }

    def post(self):
        try:
            decoded = cv2.imdecode(np.frombuffer(request.data, np.uint8), -1)
            print("decoded.shape", decoded.shape)
            # decoded = cv2.cvtColor(decoded, cv2.COLOR_BGR2GRAY)
            
            if os.path.isfile(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg")):
                os.remove(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"))
            
            cv2.imwrite(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"), decoded)

            # segmented = fs.segment(decoded)
            segmented_image, boxed_image, predicted_labels, generated_colors = fs.analyse(decoded)



            label_data = {}
            print(predicted_labels)
            print(generated_colors)
            for pred, gc in zip(predicted_labels, generated_colors):
                label_data[f"{pred}__{str(uuid1())[0:8]}"] = gc

            print(label_data)

            with open(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "predicted_labels.json"), 'w') as f:
                json.dump(label_data, f, indent=2)

            cv2.imwrite(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "segmented.jpg"), segmented_image)
            cv2.imwrite(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "boxed.jpg"), boxed_image)

        except Exception as e:
            print(e)
            return None
        

class Home(Resource):
    def get(self):
        data={"data":"Hello World"}

        return data
    
class ImagePage(Resource):
    def get(self):
        if not(os.path.isfile(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "uploaded_img.jpg"))):
            return None
        
        return send_file(os.path.join(ROOT_PATH_TO_SAVE_ASSESTS, "boxed.jpg"),  mimetype='image/jpg')
  
api.add_resource(Home,'/')
api.add_resource(UploadImage,'/upload')
api.add_resource(ImagePage,'/image')
  
  
if __name__=='__main__':
    app.run(debug=True, port=5001)
    # app.config.from_pyfile('config.py')
