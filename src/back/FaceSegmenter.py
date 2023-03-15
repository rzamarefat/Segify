from ultralytics import YOLO
from config import YOLO_WEIGHTS_PATH
import numpy as np
import cv2

class FaceSegmenter:
    def __init__(self):
        self._yolo_pretrained_weights = YOLO_WEIGHTS_PATH
        self._yolo = YOLO(self._yolo_pretrained_weights)

    def analyse(self, image: np.array):
        # if isinstance(image, np.array):
        #     raise TypeError("The image given for segmentation is not a numpy array.")
        
        result = self._yolo.predict(image)

        segmented_image = self._segment(image, result)
        boxed_image = self._get_boxes(image, result)
        predicted_labels = self._get_labels(result)

        return segmented_image, boxed_image, predicted_labels

    def _get_labels(self, result):
        labels = []
        for cls in result[0].boxes.cls:
            labels.append(result[0].names[(int(cls.item()))])

        return labels




    def _segment(self, img, result):
        mask = result[0].masks.masks.data.permute(1,2, 0).numpy()
        segmented_image = self._apply_mask(img, mask)

        return segmented_image


    
    def _get_boxes(self, img, results):
        boxes = results[0].boxes
        for box in boxes:
            top_left_x = int(box.xyxy.tolist()[0][0])
            top_left_y = int(box.xyxy.tolist()[0][1])
            bottom_right_x = int(box.xyxy.tolist()[0][2])
            bottom_right_y = int(box.xyxy.tolist()[0][3])
            cv2.rectangle(img, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), (50, 200, 129), 10)

        return img

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
    img = cv2.imread("/home/rzamarefat/projects/github_projects/StyleMe/src/back/assets/girl_car.png")
    segmented_image, boxed_image = fs.analyse(img)

    cv2.imwrite("./segmented.png", segmented_image)
    cv2.imwrite("./boxed.png", boxed_image)
    

    