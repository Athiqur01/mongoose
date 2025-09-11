import express, { Request, Response } from "express"
import { User } from "../models/user.model"
import z from "zod"
import { Note } from "../models/note.model"
export const userRoute= express.Router()

//zod schema
const addressZodSchema=z.object({
    city: z.string(),
    street: z.string(),
    zip: z.number()
})


const createUserZodSchema=z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    age: z.number(),
    password: z.string(),
    role: z.string().optional(),
    address: addressZodSchema.optional()
    
})

//post operation
userRoute.post("/create-user", async(req: Request, res: Response)=>{
    try{
         const userBody=await createUserZodSchema.parseAsync(req.body)
         //const createUser= await User.create(userBody)

         //User instance method
        //  const user= new User(userBody)
        //  const password= await user.hashPassword(userBody.password)
        //  console.log(password)
        //  user.password=password
        //  await user.save()

         //user instance method
        const password= await User.hashPassword(userBody.password)
        console.log(password)
        userBody.password=password
        const createUser= await User.create(userBody)


         //console.log(createUser)
         res.status(201).json({
         success: true,
         message: "User created successfully",
         user: createUser  //user
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