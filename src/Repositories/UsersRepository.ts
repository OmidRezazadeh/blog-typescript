import { UserInterface } from "../Interface/UserInterface";
import { IUsers, User } from "../Models/Users";

export class UsersRepository implements UserInterface {
 
    async findByEmail(email: string): Promise<IUsers | null> {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async store(data: any) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(userId:string){
     try {

      return await User.findOne({ _id: userId }).populate('profile');
    
     } catch (error) {
      console.log(error)
     }

  }
}
