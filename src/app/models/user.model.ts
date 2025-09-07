import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";

const addressSchema= new Schema<IAddress>({
        city: {type: String},
        street: {type: String},
        zip: {type: Number}
})
const userSchema= new Schema<IUser>({
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

export const User= model("User", userSchema)