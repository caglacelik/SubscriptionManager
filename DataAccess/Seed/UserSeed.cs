using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Seed
{
    public class UserSeed : IEntityTypeConfiguration<User>
    {
        // kullanıcı ekle + kullanıcılara subscription ekle
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData(new User
            {
                Id = 1,
                Email = "caglacelikkk@hotmail.com",
                Password = "12345",
                PhoneNumber = "0123456789"
            });
        }
    }
}
