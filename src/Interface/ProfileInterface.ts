import { IProfile, Profile } from '../Models/Profiles';

export interface ProfileInterface{
   store(data:any):Promise<any>
}