import { Request, Response, NextFunction } from "express";
import { UsersService } from "../../Services/UsersService";
import { UsersRepository } from "../../Repositories/UsersRepository";
import { getDecodedToken } from "../../Utlis/getDecodedToken";
import { ProfilesService } from '../../Services/ProfilesService';
import { ProfileRepository } from "../../Repositories/ProfilesRepository";
import { UserResource } from "../../transFormedData/User/UserResource";

class usersController {
  private usersService: UsersService;
  private profilesService: ProfilesService;
  
  constructor(
    usersService: UsersService,
    profilesService:ProfilesService
  ) {
    this.usersService = usersService;
    this.profilesService=profilesService
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
     //transaction todo User
     await this.usersService.validation(data);
      //transaction todo profile
      const profile = await this.profilesService.store(data)
     const profileId= profile?._id
      data.profile = profileId
     //transaction todo user
      const user = await this.usersService.store(data);
      

      res.status(201).json({ 
        user: user,
        profile:profile
       });

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
  getUser= async(req: Request, res: Response, next: NextFunction)=>{

      const token = getDecodedToken(req.get("Authorization"));
    try {
      const userId=token.user.user_id
      const user = await this.usersService.findById(userId)
      const userData = UserResource(user);
       res.status(200).json({"data":userData})
      } catch (error) {
      console.log(error)
      next(error);
    }

  }

}
const usersRepository = new UsersRepository();
const profilesRepository= new ProfileRepository();
const usersService = new UsersService(usersRepository);
const profilesService = new ProfilesService(profilesRepository)
const UsersController = new usersController(usersService,profilesService);

export { UsersController, usersService, usersRepository,profilesRepository, profilesService};
