import { model, Schema } from "mongoose"
import { INote } from "../interfaces/note.interface"


const noteSchema= new Schema <INote>({
  title: {type: String, required: true, trim: true},
  content: {type: String, default: ''},
  category: {
    type: String,
    enum: ['personal', 'work', 'study', 'others'],
    default: 'personal'
  },
  pinned: {
    type: Boolean,
    default: false
  },
  tag:{
    label: {type: String, required: true},
    color: {type: String, default:"gray"}
  },
  userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
  }
})

export const Note=model("Note", noteSchema) //Model