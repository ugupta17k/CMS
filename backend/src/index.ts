import express, { response }  from "express";
import {prisma} from "../lib/prisma"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware/AuthMiddleWare";
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())


app.post('/register', async (req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const hashPassword = await bcrypt.hash(password, 10)

    const response = await prisma.user.create({
        data: {
            username,
            email,
            password : hashPassword
        }
    })

    res.json({
        message : "User registered successfully",
        response
    })

})

app.post("/login", async (req, res)=>{
    const username = req.body.username
    const password = req.body.password

    const response = await prisma.user.findUnique({
        where : { 
            username,
        }
    })
    if(!response){
        return res.status(404).json({
            message : "user not found in DB"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, response.password)
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

app.get("/me", authMiddleware, async (req, res) => {
    const decoded = (req as any).user 
    const userId = decoded.userId

    try {
        const user = await prisma.user.findUnique({
           where : {
            id : userId
           },
           select : {
            username : true,
            email : true
           }
        })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json({ user })
    } catch (er) {
        console.log(er)
        res.status(500).json({ message: "Something went wrong" })
    }
})

app.post("/createPost", authMiddleware, async (req, res)=>{
    const content = req.body.content
    const comment = req.body.comment
    const decoded = (req as any).user
    const userId  = decoded.userId

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

    const decoded = (req as any).user 
    const userId = decoded.userId    
    if(!userId){
        res.status(404).json({
            message: " userid notfound"
        })
    }

    try { 
        const post = await prisma.user.findUnique({
            where : {
                id : userId,
            },
            include : {
                allPost : true
            }
        })
        res.json({
            post
        })
    }catch (er){
        console.log(er);
        
    }
    
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