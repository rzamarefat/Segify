from ultralytics import YOLO
from config import YOLO_WEIGHTS_PATH
import numpy as np
import cv2

class FaceSegmenter:
    def __init__(self):
        self._yolo_pretrained_weights = YOLO_WEIGHTS_PATH
        self._yolo = YOLO(self._yolo_pretrained_weights)

    def segment(self, image: np.array):
        # if isinstance(image, np.array):
        #     raise TypeError("The image given for segmentation is not a numpy array.")
        
        result = self._yolo.predict(image)
        mask = result[0].masks.masks.data.permute(1,2, 0).numpy()
        segmented_image = self._apply_mask(image, mask)

        return segmented_image


    def _apply_mask(self, image, mask):
        # print("image.shape", image.shape)
        # print
        image = cv2.resize(image, (mask.shape[1], mask.shape[0]))
        for h in range(len(image)):
            for w in range(mask.shape[1]):
                if mask[h][w][0] == 0:
                    for i in range(3):
                        image[h][w][i] = 0
                else:
                    continue
        
        return image


        
if __name__ == "__main__":
    import cv2
    fs = FaceSegmenter()
    img = cv2.imread("/home/rzamarefat/projects/github_projects/YOLOv8_Face/741D30BB-EC91-4AB6-B944-38FCD3434798.jpeg")
    segmented_image = fs.segment(img)

    cv2.imwrite("./segmented.png", segmented_image)

    