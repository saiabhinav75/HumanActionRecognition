import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import cv2,os,sys
from collections import deque
from moviepy.editor import *
from flask import Flask

app = Flask(__name__)

IMAGE_HEIGHT,IMAGE_WIDTH =64,64
args = sys.argv
if not len(args):
  print("Please provide input path")
else:
  input_path = args[1]

SEQUENCE_LENGTH = 20

DATASET_DIR="UCF50"

CLASSES_LIST=['TaiChi', 'Diving', 'BaseballPitch', 'SalsaSpin', 'Biking', 'Nunchucks', 'HorseRace', 'JumpRope', 'Skiing', 'CleanAndJerk']






@app.route('/detect/<filename>')
def predict_on_video(video_file_path,output_file_path,SEQUENCE_LENGTH):
  video_reader = cv2.VideoCapture(video_file_path)

  output_file_path = out_root_dir+filename+'.mp4'
  original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
  original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))


  video_writer = cv2.VideoWriter(output_file_path,cv2.VideoWriter_fourcc('M','P','4','V'),
                                 video_reader.get(cv2.CAP_PROP_FPS),(original_video_width,original_video_height))


  frames_queue = deque(maxlen = SEQUENCE_LENGTH)


  predicted_class_name =''


  while video_reader.isOpened():


    ok, frame = video_reader.read()


    if not ok:
      break


    resized_frame = cv2.resize(frame,(IMAGE_HEIGHT,IMAGE_WIDTH))


    normalized_frame = resized_frame / 255


    frames_queue.append(normalized_frame)


    if len(frames_queue) == SEQUENCE_LENGTH:


      predicted_labels_probabilites= LRCN_model.predict(np.expand_dims(frames_queue,axis=0))[0]


      predicted_label = np.argmax(predicted_labels_probabilites)


      predicted_class_name = CLASSES_LIST[predicted_label]
      print(predicted_class_name)
    cv2.putText(frame,predicted_class_name,(10,30),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)


    video_writer.write(frame)

  video_reader.release()
  video_writer.release()


if __name__=='__main__':

  Model_Name = "LRCN(10).model"
  LRCN_model=tf.keras.models.load_model(Model_Name)
  print("Model loaded successfully")


  out_root_dir = '../frontend/public/Videos/'
  filename=input_path.split('\\')[-1]
  print(filename)
  ['TaiChi', 'Diving', 'BaseballPitch', 'SalsaSpin', 'Biking', 'Nunchucks', 'HorseRace', 'JumpRope', 'Skiing', 'CleanAndJerk']

  test_dir="test_videos"
  output="output"
  output_path=f'{test_dir}/{output}/{filename}-output.mp4'
  output_path = 'test_videos\10\Combined.mp4'
  predict_on_video(f'{test_dir}/10/{filename}',output_path,SEQUENCE_LENGTH)
  predict_on_video(input_path,output_path,SEQUENCE_LENGTH)
  VideoFileClip(output_path,audio=False,target_resolution=(300,None)).ipython_display()