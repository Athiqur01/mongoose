import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethod, UserStaticMethod } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

const addressSchema= new Schema<IAddress>({
        city: {type: String},
        street: {type: String},
        zip: {type: Number}
},{
    _id: false //it will avoid insertion sub-id in mongodb for address object
})
const userSchema= new Schema<IUser, UserStaticMethod, UserInstanceMethod>({
    firstName:{
        type: String, 
        required: [true, "First Name is required"], 
        trim: true, 
        minLength:[3, 'First Name length Must be at least 3, got {VALUE}'],
        maxLength:[10, 'First Name length Must be at least 3, got {VALUE}'],
    },
    lastName:{type: String, required: true, trim: true},
    email: {
        type: String, 
        required: true, 
        lowercase:true, 
        unique:[true, "Provide unique email address"]},
    age: {type:Number, min:[18,"Age must be at least 18, got{VALUE}"], max: [50,"Age would be maximum 50, got{VALUE}"]},
    password: {type: String, required: true},
    role:{
        type: String,
        enum: {
            values:['user', 'admin'],
            message: "Provide valid user. Got {VALUE}"
        },
        default: "user"
    },
    address:{type: addressSchema}
})
//instance method
userSchema.method ("hashPassword", async function(plainPasswors: string){
    const password= await bcrypt.hash(plainPasswors, 10)
    console.log(password)
    return password
})
//static method
userSchema.static("hashPassword", async function(plainPasswors: string){
    const password= await bcrypt.hash(plainPasswors,10)
    console.log(password)
    return password
})

export const User= model<IUser, UserStaticMethod>("User", userSchema)