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
    public class PackageSeed : IEntityTypeConfiguration<Package>
    {
        public void Configure(EntityTypeBuilder<Package> builder)
        {
            builder.HasData(new Package
            {
                Id = 1,
                Name = "Student",
                Price = 8.99,
                Description= "FOR STUDENTS",
                ProductId = 1
            },
            new Package
            {
                Id = 2,
                Name = "Family",
                Price = 29.99,
                Description = "FOR CROWDED FAMILIES",
                ProductId = 1
            },
            new Package
            {
                Id = 3,
                Name = "Duo",
                Price = 23.99,
                Description = "FOR BESTIES",
                ProductId = 1
            },
            new Package
            {
                Id = 4,
                Name = "Level 1",
                Price = 9.90,
                Description = "BASIC",
                ProductId = 2
            },
            new Package
            {
                Id = 5,
                Name = "Level 2",
                Price = 19.90,
                Description = "INTERMEDIATE",
                ProductId = 2
            },
            new Package
            {
                Id = 6,
                Name = "Level 3",
                Price = 29.90,
                Description = "EXPERT",
                ProductId = 2
            },
            new Package
            {
                Id = 7,
                Name = "Standart",
                Price = 16.99,
                Description = "STANDART PACKAGE",
                ProductId = 3
            },
            new Package
            {
                Id = 8,
                Name = "Family",
                Price = 25.99,
                Description = "FAMILY PACKAGE",
                ProductId = 3
            },
            new Package
            {
                Id = 9,
                Name = "Student",
                Price = 9.99,
                Description = "STUDENT PACKAGE",
                ProductId = 3
            },
            new Package
            {
                Id = 10,
                Name = "Ultimate",
                Price = 44.90,
                Description = "LEAST USES",
                ProductId = 4
            },
            new Package
            {
                Id = 11,
                Name = "Console",
                Price = 29.99,
                Description = "MOST USES",
                ProductId = 4
            },
            new Package
            {
                Id = 12,
                Name = "Basic",
                Price = 37.99,
                Description = "BASIC VERSION",
                ProductId = 5
            },
            new Package
            {
                Id = 13,
                Name = "Standart HD",
                Price = 57.99,
                Description = "STANDART QUALITY",
                ProductId = 5
            },
            new Package
            {
                Id = 14,
                Name = "Ultra HD",
                Price = 77.99,
                Description = "HIGH QUALITY",
                ProductId = 5
            },
            new Package
            {
                Id = 15,
                Name = "Max",
                Price = 99.90,
                Description = "MAXIMUM PACKAGE",
                ProductId = 6
            },
            new Package
            {
                Id = 16,
                Name = "Go",
                Price = 79.90,
                Description = "GO PACKAGE",
                ProductId = 6
            },
            new Package
            {
                Id = 17,
                Name = "Prime",
                Price = 7.90,
                Description = "PRIME FOR VIDEO",
                ProductId = 7
            },
            new Package
            {
                Id = 18,
                Name = "Standart",
                Price = 106.99,
                Description = "MOST USES",
                ProductId = 8
            },
            new Package
            {
                Id = 19,
                Name = "Individual",
                Price = 59.99,
                Description = "BASIC PACKAGE",
                ProductId = 9
            },
            new Package
            {
                Id = 20,
                Name = "Family",
                Price = 119.99,
                Description = "FOR FAMILIES",
                ProductId = 9
            },
            new Package
            {
                Id = 21,
                Name = "Study",
                Price = 203.99,
                Description = "MOST USES",
                ProductId = 10
            },
            new Package
            {
                Id = 22,
                Name = "Study Pack",
                Price = 270.99,
                Description = "PREMIUM",
                ProductId = 10
            });
        }
    }
}
