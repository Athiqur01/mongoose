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