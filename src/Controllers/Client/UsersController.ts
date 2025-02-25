import { Request, Response, NextFunction } from "express";
import { UsersService } from "../../Services/UsersService";
import { UsersRepository } from "../../Repositories/UsersRepository";

class usersController {
  private usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      await this.usersService.validation(data);

      const user = await this.usersService.store(data);

      res.status(201).json({ user: user });

    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  login= async(req: Request, res: Response, next: NextFunction)=>{
    try{
    const data ={
        email:req.body.email,
         password:req.body.password
        };

        // Validating login data before attempting authentication
        await this.usersService.validationLogin(data);
        
        // Authenticating user and generating a token upon successful login  
        const token = await this.usersService.auth(data);

        // Sending the generated token in the response
        res.status(200).json({"token":token});
      
      }catch(error){
      next(error); // Passing any errors to the error handling middleware

      }
  }
  
}
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const UsersController = new usersController(usersService);

export { UsersController, usersService, usersRepository };
