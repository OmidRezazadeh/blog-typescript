export const UserCollection = (users: any) => {
    const data = users?.users;
    const transFormedData = data.map((user: any) => {
  
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role,
        profile: user.profile
          ? {
            id:user.profile._id,
            bio: user.profile.bio,
            address:user.profile.address
            }
          : null,
      };
    });
    return {
      users: transFormedData,
      meta: {
        total_pages: users?.totalPages,
        page:users?.page,
        total_Users:users?.totalUsers
      },
    };
  };