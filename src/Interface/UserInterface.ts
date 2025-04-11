import { IUsers } from "../Models/Users";

export interface UserInterface{
   findByEmail(email:string):Promise<IUsers| null>
   store(data:any):Promise<any>
   findById(userId:string):Promise<any>

}