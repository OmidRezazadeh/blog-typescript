import { NextFunction } from "express";
import { UsersService } from "../../Services/UsersService";
import { UsersRepository } from "../../Repositories/UsersRepository";

class adminUsersController {
    private usersService: UsersService;

    constructor(
      usersService: UsersService,

    ) {
      this.usersService = usersService;

    }
    list = async () => {
         console.log("ok");
    }
}
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const AdminUsersController = new adminUsersController(usersService);
export { AdminUsersController, usersService, usersRepository};
