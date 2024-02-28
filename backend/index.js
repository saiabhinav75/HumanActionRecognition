const express = require('express')
const cors = require('cors')
const app = express()
// const fileupload = require('express-fileupload')
// const multipart = require('multi-part')
// const router = express.Router()
const PORT = process.env.PORT || 3500
const uploadRouter = require('./routes/upload')

app.use(cors())
// app.use(fileupload())
app.use('/api',uploadRouter)
app.listen(PORT)


