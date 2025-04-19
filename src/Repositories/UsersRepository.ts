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

  async list(data: any) {
    try {
      const page = parseInt(data.page as string) || 1;
      const limit = parseInt(data.limit as string) || 10;
      const skip = (page - 1) * limit;
  

      const matchStage: any = {};
  
      
      if (data.name !== undefined) {
        matchStage.name = { $regex: data.name, $options: "i" };
      }
      if (data.email !== undefined) {
        matchStage.email = { $regex: data.email, $options: "i" };
      }
  
      
      const pipeline: any[] = [
        {
          $lookup: {
            from: "profiles",
            localField: "profile",
            foreignField: "_id",
            as: "profile",
          },
        },
        {
          $unwind: {
            path: "$profile",
            preserveNullAndEmptyArrays: true,
          },
        },
      ];
  

      if (data.phone !== undefined) {
        pipeline.push({
          $match: {
            "profile.phone": {$regex: data.phone, $options: "i"},
            ...matchStage,
          },
        });
      } else if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
      }
  

      const countPipeline = [...pipeline, { $count: "total" }];
      const totalResult = await User.aggregate(countPipeline);
      const total = totalResult[0]?.total || 0;
  

      pipeline.push(
        { $sort: { _id: -1 } },
        { $skip: skip },
        { $limit: limit }
      );
  
      const users = await User.aggregate(pipeline);
  
      return {
        page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        users,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Internal server error");
    }
  }
  
}
