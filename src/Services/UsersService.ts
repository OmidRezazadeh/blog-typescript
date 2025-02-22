
import { UsersRepository } from '../Repositories/UsersRepository';
import {registerValidate} from '../Validations/UserValidate';
import bcrypt from "bcryptjs";
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
}