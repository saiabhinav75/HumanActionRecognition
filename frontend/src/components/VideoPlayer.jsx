import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'
import path from 'path'

const VideoPlayer = () => {
    const {state} = useLocation();
    const src = `${state.src}`
    console.log(src)
  return (
    <div>
      {/* If Video Doesn't play disable StrictMode */}
    <ReactPlayer 
    url={`Videos/${src}`}
    width='120%'
    height='120%'
    controls={true}
    />
    </div>
  );
};

// import React from 'react';
// import { Player, ControlBar } from 'video-react';
// // import 'video-react/dist/video-react.css';

// export default function MyVideoPlayer()  {
//   return (
//     <Player src='Videos/test-output.webm'>
//       <ControlBar autoHide={false} className="my-class" />
//     </Player>
//   );
// };


export default VideoPlayer;

