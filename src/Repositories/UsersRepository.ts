import { UserInterface } from "../Interface/UserInterface";
import { IUsers, User } from "../Models/Users";

export class UsersRepository implements UserInterface{
    async findByEmail(email: string): Promise<IUsers | null> {
        try {
            const user = await User.findOne({ email: email }).exec();
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
    
