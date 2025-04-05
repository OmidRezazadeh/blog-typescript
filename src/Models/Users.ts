import { Schema, model, Types, ObjectId } from 'mongoose';

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
  }

  export interface IUsers{
    _id: ObjectId,
    name: string;
    email: string;
    password: string;
    role: UserRole;
    profile: Types.ObjectId; // One-to-one reference to Profile

}

// Create a Mongoose schema for the User model using the defined interface
const UserSchema = new Schema<IUsers>({
    // User's name is a required string field
    name: { type: String, required: true },

    // User's email is a required string field
    email: { type: String, required:true},

    role: {type: String,enum: Object.values(UserRole),default:UserRole.CLIENT},
    password: { type: String, required: true },
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' }, // One-to-one


});

// Create a Mongoose model named "User" based on the UserSchema
export const User = model("User", UserSchema);

