import { Request, Response, NextFunction } from "express";
import { UsersService } from "../../Services/UsersService";
import { UsersRepository } from "../../Repositories/UsersRepository";
import { UserResource } from "../../transFormedData/User/UserResource";
import { UserCollection } from "../../transFormedData/User/UserCollection";

class adminUsersController {
    private usersService: UsersService;

    constructor(
      usersService: UsersService,

    ) {
      this.usersService = usersService;

    }
    list = async (req: Request, res: Response, next: NextFunction) => {
   
      try {
      const userId= req.params.id;
     let userData
      if (userId) {
         const user = await this.usersService.findById(userId);
         userData = UserResource(user);
      }else{
        const data = req.body;
        const users = await this.usersService.list(data);
        userData=  UserCollection(users);
         res.json(userData);
      }
    } catch (error) {
      
    }

    }
}
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const AdminUsersController = new adminUsersController(usersService);
export { AdminUsersController, usersService, usersRepository};
