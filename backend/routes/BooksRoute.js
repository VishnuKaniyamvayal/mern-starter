import  express  from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// routes

router.post('/',async(req,res)=>{
    try
    {
        if( !req.body.title || !req.body.author || !req.body.price )
        {
           return res.status(400).send({message:"All fields are required"});
        }
        const newBook  = {
            title : req.body.title,    
            author : req.body.author,    
            price : req.body.price,    
        }
        const book = await Book.create(newBook);
        
        return res.status(200).send(book)
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({message : error.message})
    }
})

router.get('/',async ( req , res )=>{
    try
    {
        const books = await Book.find({});
        return res.status(200).send({
            count: books.length,
            data:books
        }) ;   
    }
    catch(error){
        console.log(error);
        res.status(500).send({message : error.message})
    }
})
router.get('/:id',async ( req , res )=>{
    
    const id = req.params.id;
    
    try
    {
        const book = await Book.findById(id);
        return res.status(200).send(book) ;   
    }
    catch(error){
        console.log(error);
        res.status(500).send({message : error.message})
    }
})

export default router;