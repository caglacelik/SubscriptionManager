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
    public class ProductSeed : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasData(new Product
            {
                Id = 1,
                Name = "Spotify",
                CategoryId = 2
            },
            new Product
            {
                Id = 2,
                Name = "Twitch",
                CategoryId = 1
            },
            new Product
            {
                Id = 3,
                Name = "Youtube",
                CategoryId = 2
            },
            new Product
            {
                Id = 4,
                Name = "Xbox Game Pass",
                CategoryId = 4
            },
            new Product
            {
                Id = 5,
                Name = "Netflix",
                CategoryId = 1
            },
            new Product
            {
                Id = 6,
                Name = "HBO",
                CategoryId = 1
            },
            new Product
            {
                Id = 7,
                Name = "Amazon",
                CategoryId = 1
            },
            new Product
            {
                Id = 8,
                Name = "Psn Plus",
                CategoryId = 4
            },
            new Product
            {
                Id = 9,
                Name = "Nintendo Online",
                CategoryId = 4
            },
            new Product
            {
                Id = 10,
                Name = "Chegg",
                CategoryId = 3
            });
        }
    }
}
