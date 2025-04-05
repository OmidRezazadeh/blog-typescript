import { ProfileInterface } from "../Interface/ProfileInterface";
import { Profile } from "../Models/Profiles";

export class ProfileRepository implements ProfileInterface {

  async store(data: any) {
    try {
      const user = await Profile.create(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
