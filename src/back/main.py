from flask import Flask
import requests
from flask_restful import Api, Resource, reqparse
from FaceSegmenter import FaceSegmenter
import werkzeug
import cv2
from flask_cors import CORS

  
app =   Flask(__name__)
# app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, origins="*")

api =  Api(app)

fs = FaceSegmenter()

class UploadImage(Resource):
    def get(self):
        pass
        

    def post(self):
        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parse.parse_args()
        print("args",args)
        image_file = args['file']
        
        # image_file.save("your_file_name.jpg")
        pass

class Home(Resource):
    def get(self):
        data={"data":"Hello World"}
        # img = cv2.imread("/home/rzamarefat/projects/github_projects/YOLOv8_Face/741D30BB-EC91-4AB6-B944-38FCD3434798.jpeg")
        # segmented_image = fs.segment(img)
        # cv2.imwrite("./segmented.png", segmented_image)
        return data
  
api.add_resource(Home,'/')
api.add_resource(UploadImage,'/upload')
  
  
if __name__=='__main__':
    app.run(debug=True)