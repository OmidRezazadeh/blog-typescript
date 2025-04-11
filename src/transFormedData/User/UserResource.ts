export const UserResource = (user: any) => {
 const data= {
    id: user.id,
    name: user.name,
    email: user.email,
    role:user.role,
    profile: user.profile
    ? {
        id:user.profile.id,
        bio: user.profile.bio,
        address:user.profile.address
      }
      : null,
  };
return{
  user:data
}
  
};