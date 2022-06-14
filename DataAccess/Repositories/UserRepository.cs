using Core.Entities;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(Context context) : base(context)
        {

        }

        public async Task<User> Login(User user)
        {
            return await _context.Users.Where(x => x.Email == user.Email && x.Password == user.Password).SingleOrDefaultAsync();
        }

    }
}
