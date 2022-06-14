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
    public class SubscriptionSeed : IEntityTypeConfiguration<Subscription>
    {
        public void Configure(EntityTypeBuilder<Subscription> builder)
        {
            builder.HasData(new Subscription
            {
                Id = 1,
                FinishDate = new DateTime(2022,7,10),             
                UserId=1,
                PackageId=3
            },
            new Subscription
            {
                Id = 2,
                FinishDate = new DateTime(2022, 8, 10),
                UserId = 1,
                PackageId = 9
            },
            new Subscription
            {
                Id = 3,
                FinishDate = new DateTime(2022, 9, 10),
                UserId = 1,
                PackageId = 4
            },
            new Subscription
            {
                Id = 4,
                FinishDate = new DateTime(2022, 10, 10),
                UserId = 1,
                PackageId = 10
            },
            new Subscription
            {
                Id = 5,
                FinishDate = new DateTime(2022, 11, 10),
                UserId = 1,
                PackageId = 14
            });
        }
    }
}
