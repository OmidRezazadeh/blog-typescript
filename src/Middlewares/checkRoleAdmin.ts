import { Request, Response, NextFunction } from 'express'; // Importing necessary Express types
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { getDecodedToken } from '../Utlis/getDecodedToken';
import { User, UserRole } from '../Models/Users';


export const checkAdminRoleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = getDecodedToken(req.get('Authorization'));
  try {
    
     const user = await User.findById(authHeader.user.user_id)
     if (user?.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'شما به این عملیات دسترسی ندارید' });
     }
      next(); 
  } catch (error) {
      next(error); 
      console.log(error); 
  }
}