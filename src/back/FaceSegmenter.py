from ultralytics import YOLO
from config import YOLO_WEIGHTS_PATH
import numpy as np
import cv2
from random import choice
import torch

class FaceSegmenter:
    def __init__(self):
        self._yolo_pretrained_weights = YOLO_WEIGHTS_PATH
        self._yolo = YOLO(self._yolo_pretrained_weights)

    def analyse(self, image: np.array):
        # if isinstance(image, np.array):
        #     raise TypeError("The image given for segmentation is not a numpy array.")
        
        result = self._yolo.predict(image)
        

        
        print("========================================================================")
        segmented_images = self._segment(image, result)
        print("**********************************************************************")
        boxed_image, id_holder = self._get_boxes(image, result)
        predicted_labels = self._get_labels(result)

        return segmented_images, boxed_image, predicted_labels, id_holder

    def _get_labels(self, result):
        labels = []
        for cls in result[0].boxes.cls:
            labels.append(result[0].names[(int(cls.item()))])

        return labels

    def _segment(self, img, results):
        print("len(results[0].masks)", len(results[0].masks))
        mask = results[0].masks.masks.data.permute(1,2, 0).numpy()
        print("mask.shape", mask.shape)
        # torch.unsqueeze()
        segmented_images = []
        for m in results[0].masks:
            print("m.shape",m.shape)
            m = torch.unsqueeze(m, 2)
            print("m.shape",m.shape)
            mask = m.masks.data.permute(0,2).numpy()
            print("DDDDDDDDDDDDDDDONEEEEEEEEEE")
            # segmented_image = self._apply_mask(img, mask)
            segmented_images.append(self._apply_mask(img, mask))

        
        # segmented_images = self._apply_mask(img, mask)
        return segmented_images


    def _convert_hex_to_rgb(self, hex_colors):
        converted_colors = []
        for hc in hex_colors:
            converted_colors.append(tuple(int(hc.lstrip("#")[i:i+2], 16) for i in (0, 2, 4)))

        return converted_colors


    def _get_boxes(self, img, results):
        boxes = results[0].boxes
        hex_colors = ["#"+''.join([choice('0123456789ABCDEF') for j in range(6)])
                for i in range(len(boxes))]
        
        # converted_colors = self._convert_hex_to_rgb(hex_colors)

        # for box, color in zip(boxes, converted_colors):
        id_holder = []
        for idx, box in enumerate(boxes):
            color = (80, 55, 91)
            
            id_holder.append(idx)
            top_left_x = int(box.xyxy.tolist()[0][0])
            top_left_y = int(box.xyxy.tolist()[0][1])
            bottom_right_x = int(box.xyxy.tolist()[0][2])
            bottom_right_y = int(box.xyxy.tolist()[0][3])

            org = (int(box.xyxy.tolist()[0][0]) -10, int(box.xyxy.tolist()[0][1])-10)
            img = cv2.putText(img, str(idx), org, cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv2.LINE_AA)
            cv2.rectangle(img, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), color, 3)

        return img, id_holder

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
    

    