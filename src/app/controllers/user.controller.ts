import express, { Request, Response } from "express"
import { User } from "../models/user.model"
import z from "zod"
export const userRoute= express.Router()

//zod schema


const createUserZodSchema=z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    age: z.number(),
    password: z.string(),
    role: z.string().optional(),
    
})

//post operation
userRoute.post("/create-user", async(req: Request, res: Response)=>{
    try{
         const createUser=await createUserZodSchema.parseAsync(req.body)
         console.log(createUser)
         res.status(201).json({
         success: true,
         message: "User created successfully",
         user: {}
    })
    }
    catch(error){
        console.log(error)
         res.status(400).json({
         success: false,
         message: "User creation failed",
         error: error
    })
    }
   
})
// get operation
userRoute.get("/", async(req: Request, res: Response)=>{
    const users=await User.find()
    res.status(201).json({
        success: true,
        message: "User created successfully",
        users: users})
})
//get operation for single user
userRoute.get("/:userId", async(req: Request, res: Response)=>{
    const userId=req.params.userId
    const users=await User.findOne({_id: userId})
    res.status(201).json({
        success: true,
        message: "User created successfully",
        users: users})
})
//update operation
userRoute.patch("/update-user/:userId", async(req: Request, res: Response)=>{
    const userId=req.params.userId
    const userData=req.body
    const updateUser= await User.findByIdAndUpdate(userId, userData, {new: true})
    res.status(201).json({
        success: true,
        message: "User created successfully",
        users: updateUser})
})