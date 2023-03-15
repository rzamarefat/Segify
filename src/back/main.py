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
  
app =   Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, origins="*")

api =  Api(app)

fs = FaceSegmenter()

class UploadImage(Resource):
    def get(self):
        pass

    def post(self):
        print("==================")
        print("==================")
        print("==================")
        print("==================")
        print("==================")
        print()
        # try:
        decoded = cv2.imdecode(np.frombuffer(request.data, np.uint8), -1)
        # decoded = cv2.cvtColor(decoded, cv2.COLOR_BGR2GRAY)
        
        if os.path.isfile(os.path.join(ROOT_PATH_TO_SAVE_IMAGES, "uploaded_img.jpg")):
            os.remove(os.path.join(ROOT_PATH_TO_SAVE_IMAGES, "uploaded_img.jpg"))
        

        print("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
        print(os.path.join(ROOT_PATH_TO_SAVE_IMAGES, "uploaded_img.jpg"))
        print("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
        cv2.imwrite(os.path.join(ROOT_PATH_TO_SAVE_IMAGES, "uploaded_img.jpg"), decoded)
            
        # except Exception as e:
        #     print(e)
        #     return None
        

class Home(Resource):
    def get(self):
        data={"data":"Hello World"}

        return data
    
class ImagePage(Resource):
    def get(self):
        if not(os.path.isfile(os.path.join(ROOT_PATH_TO_SAVE_IMAGES, "uploaded_img.jpg"))):
            return None
        
        return send_file(os.path.join(ROOT_PATH_TO_SAVE_IMAGES, "uploaded_img.jpg"),  mimetype='image/jpg')
  
api.add_resource(Home,'/')
api.add_resource(UploadImage,'/upload')
api.add_resource(ImagePage,'/image')
  
  
if __name__=='__main__':
    app.run(debug=True, port=5001)
    # app.config.from_pyfile('config.py')