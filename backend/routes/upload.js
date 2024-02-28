const express = require('express')
const router = express.Router()
const multer= require('multer')
const fs = require('fs');
const base64  =require('base-64')
const {spawn} = require('child_process')
const path = require('path')

const storagee = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"../python/static/")
    },
    filename:function (req,file,cb){
        return cb(null,`${file.originalname}`)
    }
})
const upload = multer({});

// router.post('/upload',(req,res)=>{

// })


// Example buffer containing video data (replace with your actual buffer)
// const videoBuffer = Buffer.from('VIDEO_DATA_HERE', 'base64');

// Write the video buffer to a file

const write = async (videoBuffer,filename) =>{
    const fileSavePath = `../python/static/${filename}`
    fs.writeFile(fileSavePath, videoBuffer, 'binary', (err) => {
    if (err) {
        console.error('Error writing video file:', err);
        return;
    }
    console.log('Video file saved successfully.');
    });
    return fileSavePath;
}

const RunPython = (filePath) =>{
    return new Promise((resolve,reject)=>{
    let dataFromPython = '';
    let scriptOutput ='';
    const childPython = spawn('python',[path.join('..','python','predict.py'),filePath])
    childPython.stdout.on('data', function(data) {
        //Here is where the output goes
    
        // console.log('stdout: ' + data);
    
        dataFromPython =data.toString().split('\n')
        scriptOutput+=data;
    });
    
    // childPython.stderr.setEncoding('utf-8');
    childPython.stderr.on('data', function(data) {
        //Here is where the error output goes
    
        // console.log('stderr: ' + data);
    
        dataFromPython =data.toString();
        scriptOutput+=data;
    });
    
    childPython.on('exit', (data) => {
        resolve(dataFromPython);
    })
})
}

router.post('/upload',upload.single('video'), async (req, res) => {
    // console.log(Object.keys(req))
    console.log("file info")
    console.log(req.file)
    if (!req.file) {
        return res.status(400).send('No video file uploaded.');
    }
    const buffer = Buffer.from(req.file.buffer,base64)
    console.log(buffer)
    console.log(typeof buffer)
    const videoBuffer = Buffer.from(buffer,base64);
    const filename = req.file.originalname;
    const filePath = await write(buffer,filename);
    console.log(filePath)
    // Do not save the file instead use the buffer and transfer to python backend
    // Access the uploaded video file from req.file
    // const videoBuffer = req.file.buffer;
    // console.log(req.file, req.body)
    // let OutputPath = await RunPython(filePath) 
    // OutputPath.pop()
    // console.log(OutputPath)
    return res.send(filePath)
});

module.exports = router