// approch-1 for POST operation
import express from "express"
import { Request, Response } from "express"
import { Note } from "../models/note.model"

export const noteRoute=express.Router()

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
  const body=req.body
  const note= await Note.create(body)
  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note
  })
})

//get operatoin for notes
noteRoute.get("/", async(req: Request, res: Response)=>{
  const notes= await Note.find()
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
