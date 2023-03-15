import os

current_path = os.getcwd()


YOLO_WEIGHTS_PATH = os.path.join(current_path, "pretrained_weights", "yolov8n-seg.pt")

TESTING = True
DEBUG = True
FLASK_ENV = 'development'


ROOT_PATH_TO_SAVE_IMAGES = os.path.join(current_path, "assets")





