
import { UsersRepository } from '../Repositories/UsersRepository';
import {registerValidate, validationLogin} from '../Validations/UserValidate';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export class UsersService{
      
        private usersRepository:UsersRepository;
      constructor(usersRepository:UsersRepository){
        this.usersRepository=usersRepository;
      }

      async validation(data: any): Promise<any> {
        try {
            // Validate data before checking if the user exists
            const { error } = registerValidate.validate(data);
            if (error) {
                const errors = new Error(error.details[0].message);
                (errors as any).status = 400;
                throw errors;
            }
    
            // Check if the user already exists
            const userExists = await this.usersRepository.findByEmail(data.email);
            if (userExists) {
                const errorEmail = new Error("ایمیل تکراریست");
                (errorEmail as any).status = 400;
                throw errorEmail;
            }
    
            // If validation passes, return success response
            return { success: true, message: 'Validation successful' };
    
        } catch (err) {
            console.error('Validation error:', err);
            throw err; // Re-throw the error for higher-level handling
        }
    }
    
    async store(data:any):Promise<any>{
        const hashPassword = await bcrypt.hashSync(data.password, 10);
        data.password= hashPassword;  
        const user=  await this.usersRepository.store(data); 
        return user;
    }
    async validationLogin(data:any){
        const { error } = validationLogin.validate(data);
        if (error) {
          const errors = new Error(error.details[0].message);
          (errors as any).status = 400;
          throw errors;
        }
        
    let email = data.email;
    const userExists = await this.usersRepository.findByEmail(email);
    if (!userExists) {
        const errorEmail = new Error("کاربری بااین ایمیل  یافت نشد");
        (errorEmail as any).status = 400;
        throw errorEmail;
      }
    

    }
  async auth(data:any){
    const user = await this.usersRepository.findByEmail(data.email);
  
    if (user && await bcrypt.compare(data.password, user.password)) {
      const token = jwt.sign(
        { user: { user_id: user._id, email: user.email, name: user.name } },
        process.env.JWT_SECRET as string,
        { expiresIn: "2h" }
      );
        return token;
    }
    else{
      const error = new Error("نام کاربری یا رمز عبور اشتباه است ");
      (error as any).status = 400;
      throw error;
    }
  }

   async findById(userId:string){
    return  await this.usersRepository.findById(userId);

   }
}