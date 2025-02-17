import { Request, Response, NextFunction } from "express";
import { UsersService } from '../../Services/UsersService';


class userController{
    private  usersService:UsersService;
    constructor(
      usersService:UsersService
    ){
        this.usersService = usersService;
   
    }
    register =async (req:Request, res:Response, next:NextFunction)=>{
        

        try{
            const  data= req.body;
            await this.usersService.validation(data);


        }catch(error){
console.log(error)
        }
    }
}
//مقدار هارو دریافت کنی 
//اعتبار سنجی کنی 
// ذخیره کنی 
//خروجی نمایش بدی 