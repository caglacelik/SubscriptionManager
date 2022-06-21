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
                Id = 10,
                FinishDate = new DateTime(2022, 7, 11),
                UserId = 5,
                PackageId = 4
            },
            new Subscription
            {
                Id = 2,
                FinishDate = new DateTime(2022, 8, 11),
                UserId = 5,
                PackageId = 5
            },
            new Subscription
            {
                Id = 3,
                FinishDate = new DateTime(2022, 8, 16),
                UserId = 5,
                PackageId = 8
            },
            new Subscription
            {
                Id = 4,
                FinishDate = new DateTime(2022, 10, 15),
                UserId = 5,
                PackageId = 12
            },
            new Subscription
            {
                Id = 5,
                FinishDate = new DateTime(2022, 11, 12),
                UserId = 5,
                PackageId = 13
            });
        }
    }
}
