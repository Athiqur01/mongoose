// approch-1 for POST operation
import express from "express"
import { Request, Response } from "express"
import { Note } from "../models/note.model"
import z from "zod";

export const noteRoute=express.Router()

//zod schema
export const noteZodSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().default(""),
  category: z.enum(["personal", "work", "study", "others"]).default("personal"),
  pinned: z.boolean().default(false),
  tag: z.object({
    label: z.string().min(1, "Tag label is required"),
    color: z.string().default("gray"),
  }),
  userId: z.string().min(1, "UserId is required"), // ObjectId as string
});



// app.post("/create-note", async(req:Request, res:Response)=>{
//   const myNote=new Note({
//     title:"  Learning Express  ",
//     tag: {label: "Back-end"}
    
//   })
//   await myNote.save()
//   res.status(201).json({
//     success: true,
//     message: "Note created successfully",
//     note: myNote
//   })
// })

//Approch-2 for post operation
noteRoute.post("/create-note", async(req: Request, res: Response)=>{
//
try{
         const noteBody=await noteZodSchema.parseAsync(req.body)
         const createNote= await Note.create(noteBody)
         console.log(noteBody)
         res.status(201).json({
         success: true,
         message: "Note created successfully",
         user: createNote
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
//
})

//get operatoin for notes
noteRoute.get("/", async(req: Request, res: Response)=>{
  const notes= await Note.find().populate('userId') // Here using populate, we can join user info with note info. 
  res.status(201).json({
    success: true,
    message: "Finding notes are being successful ",
    notes: notes
  })
})

//get operation by ID
noteRoute.get("/:noteId", async(req:Request, res: Response)=>{
  const noteId=req.params.noteId
  //const note= await Note.findById(noteId)
  const note= await Note.findOne({
    _id: noteId
  })
  res.status(201).json({
    success: true,
    message: "Note fetched successfully",
    note: note
  })

})
//update operation
noteRoute.patch("/:noteId", async(req: Request, res: Response)=>{
  const noteId=req.params.noteId
  const noteBody=req.body
  const noteUpdate=await Note.findByIdAndUpdate(noteId, noteBody, {new: true}) // for using {new: true} updated data showed 
  res.status(201).json({
    success: true,
    message: "updated successfully",
    note: noteUpdate
  })
})
