import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'
import path from 'path'

const VideoPlayer = () => {
    const {state} = useLocation();
    // const src = `../${state.src}`
    // console.log(src)
  return (
    <div>
    <ReactPlayer 
    url='Videos\test.webm'
    width='80%'
    height='40%'
    controls={true}
    />
    </div>
  );
};

export default VideoPlayer;

