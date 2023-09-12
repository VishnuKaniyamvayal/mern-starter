import express from "express";
import { PORT , DB } from "./constants.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import router from "./routes/BooksRoute.js";
import cors from "cors"
const app = express();

app.get("/",(req,res)=>{
    console.log(req);
    return res.status(200).send({status:'success',message:"Page has rendered successfully"});
})
//middle wares
app.use(cors({
    origin:"http:/localhost:5000",
    methods : ['GET','POST'],
    allowedHeaders : ['Content-type']
}))
app.use('/books',router)
app.use(express.json())

mongoose.connect(DB).then(()=>{
    
    app.listen( PORT ,()=>{
        console.log("started successfully");
    })

}).catch((error)=>{
    console.log(error)
})

