import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
import mongoose from "mongoose";



const port = 5000
// password: eDjuMOkSrsBrM9a1

async function main(){
    try{
        await mongoose.connect('mongodb+srv://todo:eDjuMOkSrsBrM9a1@cluster0.mnncxar.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0')
        app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
})
    }catch(error){
        console.log(error)
    }
}

main()