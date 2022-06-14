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
    public class CategorySeed : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasData(new Category
            {
                Id = 1,
                Name = "Entertainment"
            },
            new Category
            {
                Id = 2,
                Name = "Music"
            },
            new Category
            {
                Id = 3,
                Name = "Education"
            },
            new Category
            {
                Id = 4,
                Name = "Game"
            });
        }
    }
}
