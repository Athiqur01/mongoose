import express, { Request, Response } from "express"
import { User } from "../models/user.model"
export const userRoute= express.Router()

//post operation
userRoute.post("/create-user", async(req: Request, res: Response)=>{
    const userBody=req.body
    const createUser= await User.create(userBody)
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: createUser
    })
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