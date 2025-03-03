import {ObjectId, Schema, model } from "mongoose";
export interface IUsers{
    _id: ObjectId,
    name: string;
    email: string;
    password: string;
}

// Create a Mongoose schema for the User model using the defined interface
const UserSchema = new Schema<IUsers>({
    // User's name is a required string field
    name: { type: String, required: true },

    // User's email is a required string field
    email: { type: String, required: true },

    // User's password is a required string field
    password: { type: String, required: true },

});

// Create a Mongoose model named "User" based on the UserSchema
export const User = model("User", UserSchema);

