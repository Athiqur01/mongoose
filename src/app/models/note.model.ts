import { model, Schema } from "mongoose"

const noteSchema= new Schema({
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
  }

})

export const Note=model("Note", noteSchema) //Model