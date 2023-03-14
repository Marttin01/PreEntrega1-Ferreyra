import express, { Router } from 'express'
import multer from 'multer'
import { apiRouter } from './routers/apiRouter.js'

// const upload = multer ({ dest: './static/images'})
const app = express()

app.use(express.json())
app.use('/api', apiRouter)
// app.post('/archivos', upload.array('archivo'), (req,res,next) =>{
//     res.json(req.file)
// })

app.listen(8080, () => console.log("Servidor funcionando en 8080"))

