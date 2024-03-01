import React, { useState , useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../../public/css/video.css'




export default function Video() {
  const fileInput = useRef();
  const Navigate = useNavigate();
  const [supported,setSupported] = useState(false)
  const [filename,setFileName] = useState('')
  const hasVideoExtension = (event) => {
    const selectedFile = event.target.files;
    console.log(selectedFile)
    if(selectedFile){
      setFileName(selectedFile[0].name)
      console.log(selectedFile[0].name)
    }
  }
  useEffect(()=>{
    const Validate = () =>{
      const videoExtensions = ['mp4', 'mpeg', 'webm'];
      const file = filename
      const extension = file.split('.');
      setSupported(videoExtensions.includes(extension.pop()));
    }
    Validate()
  },[filename])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (filename&&supported) {
        console.log(filename)
        const formData = new FormData();
        formData.append('video', fileInput.current.files[0])
        try {
            const response = await axios.post('http://localhost:3500/api/upload/', formData)
            if (response.status===200) {
              Navigate("/Player",{
                state:{
                  src: response.data
                }
              })
                console.log('Video uploaded successfully.');
            } else {
                console.error('Failed to upload video.');
            }
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    } else {
        console.log('No video selected.');
    }
};


  const videoExtensions = ['mp4', 'mpeg', 'webm'];
  return (
    <div>
      <div className='container'>
        <h1>Action Recognition With LRCN</h1>
      </div>
      <div className='video-container'>
      <p font>{supported?'Uploaded Video is Supported':`Types supported : ${videoExtensions}`}</p>
      <form onSubmit={handleSubmit}>
        <input type='file' name='video' ref={fileInput} onChange={hasVideoExtension}/>
        <input type='submit' placeholder='Upload' className='upload-button'/>
      </form>
    </div>
    </div>
  )
}
