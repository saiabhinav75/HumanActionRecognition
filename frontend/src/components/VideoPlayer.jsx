import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'
import path from 'path'

const VideoPlayer = () => {
    const {state} = useLocation();
    const src = `${state.src}`
    // console.log(src)
  return (
    <div>
      {src}
    <ReactPlayer 
    url='../../public/Videos/test.webm'
    width='120%'
    height='120%'
    controls={true}
    />
    </div>
  );
};

export default VideoPlayer;

