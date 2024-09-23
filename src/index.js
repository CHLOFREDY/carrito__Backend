import express from "express" 
import path from "path"
import { fileURLToPath } from "url" 
import cors from "cors"


const app=express()  

app.use(cors())

const port=5000 

const __fieldname=fileURLToPath(import.meta.url) 
const __dirname=path.dirname(__fieldname) 

app.use(express.static(path.join(__dirname,"..","public"))) 



app.get('/carrito',(req,res)=>{
    res.sendFile(path.join(__dirname, ".." ,"public" ,"index.html"))
})



app.listen(port,()=>{
    console.log(`se esta escuchando el puerto:${port}`)
})

