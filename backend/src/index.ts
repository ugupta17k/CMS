import express  from "express";
import {prisma} from "../lib/prisma"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware/AuthMiddleWare";


const app = express()

app.use(express.json())

app.post('/register', async (req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const hashPassword = bcrypt.hash(password, 10)

    const response = await prisma.user.create({
        data: {
            username,
            email,
            password : JSON.stringify(hashPassword)
        }
    })

    res.json({
        message : "User registered successfully",
        response
    })

})

app.post("/login", async (req, res)=>{
    const email = req.body.email
    const password = req.body.password

    const response = await prisma.user.findUnique({
        where : { 
            email,
        }
    })
    if(!response){
        return res.status(404).json({
            message : "user not found in DB"
        })
    }

    const isPasswordValid = bcrypt.compare(password, response.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid password"
        })
    }

    const userId = response?.id

    const token = jwt.sign({
        userId,
    },process.env.JWT_SECRET_KEY!)

    res.json({
        token
    })

})

app.post("/postSubmit", authMiddleware, async (req, res)=>{
    const content = req.body.content
    const comment = req.body.comment
    const userId = (req as any).user

    const response = await prisma.post.create({
        data : {
            content : content,
            commment : comment,
            publishStatus : "Published",
            userId : userId
        }
    })

    res.json({
        response
    })
})

app.get("/AllPost",authMiddleware , async (req, res)=>{

    const userId = (req as any).user

    
    const response = await prisma.user.findMany({
        where:{
            id : userId
        },
        include : {
            allPost : true
        }
    })

    res.json({
        response
    })
})

app.get("/post/:postId", authMiddleware, async (req, res)=>{
    const postId = req.params.postId as string

    const response = await prisma.post.findUnique({
        where : {
            id : postId
        }
    })

    res.json({
        response
    })
})



app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})