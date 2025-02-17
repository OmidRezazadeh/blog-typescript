import { IUsers } from "../Models/Users";

export interface UserInterface{
   findByEmail(email:string):Promise<IUsers| null>
}