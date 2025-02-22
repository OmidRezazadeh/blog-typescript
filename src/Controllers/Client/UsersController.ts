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
}
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const UsersController = new usersController(usersService);

export { UsersController, usersService, usersRepository };
