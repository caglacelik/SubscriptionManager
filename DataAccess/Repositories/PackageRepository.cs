using Core.DTOs;
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
    public class PackageRepository : GenericRepository<Package>, IPackageRepository
    {
        public PackageRepository(Context context) : base(context)
        {
        }

        public async Task<List<PackageDto>> GetPackagesWithProductId(int productId)
        {
            return await _context.Packages.Include(x=>x.Product).Where(x=>x.ProductId == productId).Select(x=> new PackageDto {
                Id = x.Id,
                ProductId = x.ProductId,
                Name = x.Name,
                Price = x.Price,
                Description= x.Description,
                CategoryName= x.Product.Category.Name
                }).ToListAsync();

        }
        public async Task<PackageDto> GetById(int packageId)
        {
            return await _context.Packages.Include(x => x.Product).ThenInclude(x => x.Category).Where(x => x.Id == packageId).
                Select(x => new PackageDto()
                {
                    Id = x.Id,
                    CategoryName= x.Product.Category.Name,
                    Name= x.Name,
                    ProductId=x.ProductId,
                    Price= x.Price,
                    Description=x.Description
                }).SingleOrDefaultAsync();
        }
    }
}
