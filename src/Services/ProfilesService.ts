import { ProfileRepository } from '../Repositories/ProfilesRepository';
export class ProfilesService{
    private profilesRepository:ProfileRepository;
    constructor(profilesRepository:ProfileRepository){
      this.profilesRepository=profilesRepository;
    }
    
    async store(data:any):Promise<any>{
        const profile=  await this.profilesRepository.store(data); 
        return profile;
    }
}