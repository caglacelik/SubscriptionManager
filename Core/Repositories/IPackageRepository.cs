using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IPackageRepository : IGenericRepository<Package>
    {
        Task<List<PackageDto>> GetPackagesWithProductId(int productId);
        Task<PackageDto> GetById(int packageId);
    }
}
