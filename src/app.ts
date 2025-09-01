import express, { Application, Request, Response } from "express"
import { model, Schema } from "mongoose"
import { noteRoute } from "./app/controllers/note.controller"
import { userRoute } from "./app/controllers/user.controller"

const app: Application = express()

app.use(express.json())

app.use("/notes", noteRoute)
app.use("/user", userRoute)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello note app')
})

export default app