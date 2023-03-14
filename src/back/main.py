from flask import Flask
from flask_restful import Api, Resource, reqparse
from FaceSegmenter import FaceSegmenter
import werkzeug
import cv2
  
app =   Flask(__name__)
api =   Api(app)

fs = FaceSegmenter()

class UploadImage(Resource):
    def post(self):
        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parse.parse_args()
        image_file = args['file']
        image_file.save("your_file_name.jpg")

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